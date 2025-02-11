'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { registrationSchema } from './validate';
import { BASE_URL, checkExistingUser, calculateTotalPrice } from './utils/helpers';

import ExistingUserForm from './components/ExistingUserForm';
import NewUserForm from './components/NewUserForm';

export default function Signup() {
    const [searchParams] = useSearchParams();
    const planId = searchParams.get('planId');
    const [gstinf,setGstInf]=useState(null);
    const [plan, setPlan] = useState(null);
    const [isNewUser, setIsNewUser] = useState(true);
    const [additionalLicenses, setAdditionalLicenses] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasActivePlan, setHasActivePlan] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [serviceOptions, setServiceOptions] = useState([]);
    const [agencyDetails, setAgencyDetails] = useState(null);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            gst: '',
            gstInfo: null,
            agencyName: '',
            ownerName: '',
            email: '',
            phone: '',
            agencyMobile: '',
            employees: '',
            services: []
        },
        resolver: zodResolver(registrationSchema),
        mode: 'onChange'
    });

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/subscription-plans/${planId}`);
                setPlan(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch plan details");
            }
        };

        const fetchServices = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/services-name`);
                const services = [...new Set(response.data.formConfigs.map((service) => service.serviceType))];
                setServiceOptions(services);
            } catch (error) {
                toast.error("Failed to fetch services");
            }
        };

        if (planId) {
            fetchPlanDetails();
            fetchServices();
        }
    }, [planId]);

    useEffect(() => {
        const loadRazorpay = () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => {
                setRazorpayLoaded(true);
            };
            script.onerror = () => {
                toast.error("Payment gateway failed to load");
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        loadRazorpay();
    }, []);

    const handleExistingUserCheck = async (email) => {
        const result = await checkExistingUser(email);
        if (result) {
            setAgencyDetails(result);
            setHasActivePlan(result.hasActivePlan);
            toast.success(`Welcome back, ${result.agencyName}`);
        } else {
            setAgencyDetails(null);
            setHasActivePlan(false);
        }
    };

    const onSubmit = async (data) => {
        if (!razorpayLoaded) {
            toast.error("Payment gateway is loading. Please try again.");
            return;
        }

        setIsLoading(true);
        try {
            const totalAmount = Math.round(calculateTotalPrice(plan, isNewUser, hasActivePlan, additionalLicenses).total * 100);

            const options = {
                key: "rzp_test_4kJGZ6vUcstgUm", // Replace with your actual Razorpay key
                amount: totalAmount,
                currency: 'INR',
                name: 'Travel Agency Registration',
                description: `
${plan.planName} Plan Registration`,
                handler: async (response) => {
                    const registrationPromise = async () => {
                        const registrationResponse = await axios.post('/api/v1/register-agency-with-subdomain', {
                            ...data,
                            paymentDetails: response,
                            planId: plan._id,
                            additionalLicenses,
                            gstinf
                        });
                        return registrationResponse.data;
                    };

                    toast.promise(registrationPromise(), {
                        pending: 'Registering agency...',
                        success: {
                            render({ data }) {
                                // Additional success actions
                                // alert("Registration Successful!");
                                // You can add more actions like:
                                // - Redirect to a new page
                                // - Update application state
                                // - Close modal
                                return 'Agency registered successfully!';
                            }
                        },
                        error: {
                            render({ data }) {
                                // Customize error message
                                console.error(data);
                                return data.response?.data?.message || 'Registration failed. Please try again.';
                            }
                        }
                    });
                },
                prefill: {
                    name: data.ownerName,
                    email: data.email,
                    contact: data.phone
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error('Payment initialization error:', error);
            toast.error('Payment initialization failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleExistingUserSubmit = async () => {
        if (!razorpayLoaded) {
            toast.error("Payment gateway is loading. Please try again.");
            return;
        }

        setIsLoading(true);
        try {
            const totalAmount = Math.round(calculateTotalPrice(plan, false, hasActivePlan, additionalLicenses).total * 100);

            const options = {
                key: "rzp_test_4kJGZ6vUcstgUm", // Replace with your actual Razorpay key
                amount: totalAmount,
                currency: 'INR',
                name: 'Travel Agency Plan Update',
                description: `${plan.planName} Plan Update`,
                handler: async (response) => {
                    try {
                        const updateResponse = await axios.post('/api/v1/update-subscription', {
                            email: agencyDetails.email,
                            paymentDetails: response,
                            planId: plan._id,
                            additionalLicenses
                        });

                        if (updateResponse.data.success) {
                            toast.success('Plan updated successfully!');
                            alert("Plan updated successfully!");
                            // Handle post-update actions (e.g., redirect)
                        }
                    } catch (error) {
                        toast.error('Plan update failed');
                    }
                },
                prefill: {
                    name: agencyDetails?.ownerName,
                    email: agencyDetails?.email,
                    contact: agencyDetails?.phoneNumber
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error('Payment initialization error:', error);
            toast.error('Payment initialization failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (!plan) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className=" grid grid-cols-1 md:grid-cols-5 bg-gradient-to-r from-blue-100 to-purple-100  p-4">
            {/* <ToastContainer/> */}
            <Card className=" col-span-3 mx-auto w-full">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-primary">Register New Travel Agency</CardTitle>
                    <CardDescription className="text-center">Join our platform and grow your business</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="new-user" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="new-user" onClick={() => setIsNewUser(true)}>New User</TabsTrigger>
                            <TabsTrigger value="existing-user" onClick={() => setIsNewUser(false)}>Existing User</TabsTrigger>
                        </TabsList>
                        <TabsContent value="new-user">
                            <NewUserForm
                                control={control}
                                errors={errors}
                                serviceOptions={serviceOptions}
                                watch={watch}
                                setValue={setValue}
                                isLoading={isLoading}
                                onSubmit={handleSubmit(onSubmit)}
                                setGstInf={setGstInf}
                            />
                        </TabsContent>
                        <TabsContent value="existing-user">
                            <ExistingUserForm
                                checkExistingUser={handleExistingUserCheck}
                                agencyDetails={agencyDetails}
                                additionalLicenses={additionalLicenses}
                                setAdditionalLicenses={setAdditionalLicenses}
                                onSubmit={handleExistingUserSubmit}
                                isLoading={isLoading}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <Card className=" mx-auto  w-full  col-span-2">
                <CardHeader>
                    <CardTitle>{plan.planName} Plan</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-2xl font-bold">₹{plan.price?.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">per {plan.billingFrequency}</p>
                        </div>
                        <div>
                            <p className="text-sm">Trial Period: {plan.trialPeriodDays} days</p>
                            <p className="text-sm">Max Licenses: {plan.maxLicenses}</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {Object.entries(calculateTotalPrice(plan, isNewUser, hasActivePlan, additionalLicenses)).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                                <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                                <span>₹{value.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

