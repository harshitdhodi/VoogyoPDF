"use client"

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Check, Calendar, CreditCard, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function Payment() {
    const [currentSubscription, setCurrentSubscription] = useState(null)
    const [subscriptionPlan, setSubscriptionPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedDuration, setSelectedDuration] = useState(1)
    const [totalAmount, setTotalAmount] = useState(0)
    const [razorpayLoaded, setRazorpayLoaded] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(true)
    const [name, setName] = useState('');
    const { agencyId, code } = useParams();

    // Load Razorpay script
    useEffect(() => {
        const loadRazorpay = () => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.async = true
            script.onload = () => {
                setRazorpayLoaded(true)
            }
            script.onerror = () => {
                setError('Failed to load payment gateway. Please refresh the page.')
                toast.error("Payment gateway failed to load")
            }
            document.body.appendChild(script)

            // Cleanup
            return () => {
                document.body.removeChild(script)
            }
        }

        loadRazorpay()
    }, [])

    const fetchSubscriptionData = async (agencyId) => {
        try {
            setError(null)
            const tenancyResponse = await axios.get(`/api/v1/tenecy-code/${code}`);
            const subscriptionResponse = await axios.get(`/api/v1/subscribe/${agencyId}`)
            setCurrentSubscription(subscriptionResponse.data)
            setName(tenancyResponse.data.agencyName);
            const planResponse = await axios.get(`/api/v1/subscription-plan/${subscriptionResponse.data.subscriptionPlanId}`)
            setSubscriptionPlan(planResponse.data)
            setTotalAmount(planResponse.data.price)
        } catch (error) {
            setError('Failed to fetch subscription details. Please refresh the page or try again later.')
            toast.error("Error loading subscription details")
            console.error('Subscription fetch error:', error)
        }
    }

    useEffect(() => {

        fetchSubscriptionData(agencyId).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (subscriptionPlan) {
            const discounts = {
                3: 0.05,  // 5% off for 3 months
                6: 0.10,  // 10% off for 6 months
                12: 0.15, // 15% off for 12 months
            }
            const discount = discounts[selectedDuration] || 0
            const baseAmount = subscriptionPlan.price * selectedDuration
            setTotalAmount(baseAmount * (1 - discount))
        }
    }, [selectedDuration, subscriptionPlan])

    const initializeRazorpayPayment = async () => {
        if (!razorpayLoaded) {
            toast.error("Payment gateway is loading. Please try again in a moment.")
            return
        }

        setPaymentLoading(true)
        const toastId = toast.loading("Initializing payment...")

        try {
            // 1. Create order on your backend

            const orderResponse = await axios.post('/api/v1/create-razorpay-order', {
                amount: parseInt(totalAmount) * 1, // Razorpay expects amount in smallest currency unit (paise)
                currency: 'INR',
                planId: subscriptionPlan._id,
                duration: selectedDuration
            })

            // 2. Initialize Razorpay payment
            const options = {
                key: "rzp_test_4kJGZ6vUcstgUm", // Your Razorpay Key ID from environment variable
                amount: orderResponse.data.amount,
                currency: orderResponse.data.currency,
                name: "VoogyoTraveler",
                description: `${subscriptionPlan.planType} Plan - ${selectedDuration} Month${selectedDuration > 1 ? 's' : ''}`,
                order_id: orderResponse.data.id,
                handler: async (response) => {
                    // Handle successful payment
                    await handlePaymentSuccess({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    })
                },
                prefill: {
                    name: currentSubscription?.userName || "",
                    email: currentSubscription?.userEmail || "",
                },
                theme: {
                    color: "#0284c7" // Tailwind sky-600
                },
                modal: {
                    ondismiss: async () => {
                        setPaymentLoading(false)
                        toast.update(toastId, {
                            render: "Payment cancelled",
                            type: "info",
                            isLoading: false,
                            autoClose: 3000
                        })
                    }
                }
            }

            const razorpayInstance = new window.Razorpay(options)
            razorpayInstance.open()

            toast.update(toastId, {
                render: "Payment window opened",
                type: "info",
                isLoading: false,
                autoClose: 1000
            })




        } catch (error) {
            console.error('Payment initialization error:', error)
            toast.update(toastId, {
                render: error.response?.data?.message || "Failed to initialize payment. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 5000
            })
            setPaymentLoading(false)
        }
    }

    const handlePaymentSuccess = async ({ paymentDetails, razorpay_payment_id }) => {
        const verifyToastId = toast.loading("Verifying payment...")

        try {
            // const agencyId = "66fbf984442b85edcffa36ca" // TODO: Get from URL params

            // Verify payment with your backend
            await axios.post(`/api/v1/subscribe/${agencyId}`, {
                planId: subscriptionPlan._id,
                duration: selectedDuration,
                paymentDetails: {
                    ...paymentDetails,
                    transactionId: razorpay_payment_id,
                    amount: totalAmount,
                    method: 'razorpay',
                    duration: selectedDuration

                }
            })

            toast.update(verifyToastId, {
                render: "Payment successful! Your subscription has been activated.",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })


            window.location.href = `/thank-you/${razorpay_payment_id}`;

            // setShowSuccessDialog(true);

            // Close window after 3 seconds
            // setTimeout(() => {
            //     window.close()
            // }, 4000)
            // Refresh subscription data
            // await fetchSubscriptionData(agencyId);

        } catch (error) {
            console.error('Payment verification error:', error)
            toast.update(verifyToastId, {
                render: "Payment verification failed. Please contact support.",
                type: "error",
                isLoading: false,
                autoClose: 5000
            })
        } finally {
            setPaymentLoading(false)
        }
    }
    const handleClose = () => {
        setShowSuccessDialog(false);

        // window.close();
    }

    // Rest of the component remains the same...
    // (The return JSX remains exactly the same as before, just without the Script component wrapper)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <>

            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Card className="mb-8">
                    {name && <h1>{name}</h1>}
                    <CardHeader>
                        <CardTitle>Subscription Payment</CardTitle>
                        <CardDescription>Complete your payment to activate your subscription</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {subscriptionPlan && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {subscriptionPlan.planType.toUpperCase()} Plan
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Key Features:</h4>
                                            <ul className="space-y-2">
                                                {subscriptionPlan.features.slice(0, 5).map((feature, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <Check className="h-4 w-4 text-green-500" />
                                                        <span className="text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Support:</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Clock className="h-4 w-4" />
                                                {subscriptionPlan.customerSupport.supportType} support with{' '}
                                                {subscriptionPlan.customerSupport.responseTime} response time
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Select Subscription Duration
                                        </label>
                                        <Select
                                            value={selectedDuration.toString()}
                                            onValueChange={(value) => setSelectedDuration(parseInt(value))}
                                        >
                                            <SelectTrigger className="w-full md:w-[200px]">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 Month</SelectItem>
                                                <SelectItem value="3">3 Months (5% off)</SelectItem>
                                                <SelectItem value="6">6 Months (10% off)</SelectItem>
                                                <SelectItem value="12">12 Months (15% off)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">Payment Summary</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Base Price (per month)</span>
                                                <span>₹{subscriptionPlan.price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Duration</span>
                                                <span>{selectedDuration} month{selectedDuration > 1 ? 's' : ''}</span>
                                            </div>
                                            {selectedDuration > 1 && (
                                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                                    <span>Duration Discount</span>
                                                    <span>-{selectedDuration === 3 ? '5' : selectedDuration === 6 ? '10' : '15'}%</span>
                                                </div>
                                            )}
                                            <div className="border-t pt-2 flex justify-between font-bold">
                                                <span>Total Amount</span>
                                                <span>₹{totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full"
                                        onClick={initializeRazorpayPayment}
                                        disabled={paymentLoading || !razorpayLoaded}
                                    >
                                        {paymentLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <CreditCard className="mr-2 h-4 w-4" />
                                        )}
                                        {paymentLoading ? "Processing..." :
                                            !razorpayLoaded ? "Loading Payment Gateway..." :
                                                `Pay Now ₹${totalAmount.toFixed(2)}`}
                                    </Button>
                                </div>


                                {/* 
                                {currentSubscription?.subscriptionHistory && currentSubscription.subscriptionHistory.length > 0 && (
                                    <div className="mt-8">
                                        <h4 className="font-medium mb-4">Payment History</h4>
                                        <div className="space-y-3">
                                            {currentSubscription.subscriptionHistory.map((history, index) => (
                                                <div key={index} className="border dark:border-gray-700 p-3 rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h5 className="font-medium">{history.type} Plan</h5>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-4 w-4" />
                                                                    {new Date(history.startDate).toLocaleDateString()} - {new Date(history.endDate).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-medium">₹{history.paymentDetails.amount.toFixed(2)}</div>
                                                            <Badge variant={history.status === 'active' ? 'success' : 'secondary'}>
                                                                {history.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}