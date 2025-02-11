'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, IndianRupee, BarChart3, Mail, Check } from 'lucide-react'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const featureIcons = [
  <Users key="users" className="w-6 h-6 text-primary" />,
  <Calendar key="calendar" className="w-6 h-6 text-primary" />,
  <IndianRupee key="rupee" className="w-6 h-6 text-primary" />,
  <Mail key="mail" className="w-6 h-6 text-primary" />,
]

export default function SubscriptionLandingPage() {
  const [subscriptionPlans, setSubscriptionPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate=useNavigate();
  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const response = await axios.get('/api/v1/subscription-plans', {
          params: {
            page: 1,
            limit: 10,
            isActive: true,
            sortBy: 'price',
            order: 'asc'
          }
        });

        if (response.data.data && response.data.data.length > 0) {
          setSubscriptionPlans(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subscription plans')
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handleStartTrial = (planId) => {
    // Navigate to signup page with specific plan
    navigate(`/signup?planId=${planId}`)
  }
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error || subscriptionPlans.length === 0) {
    return <div className="flex justify-center items-center min-h-screen text-destructive">{error || 'No subscription plans found'}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col items-center justify-center p-4 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
        Choose Your Perfect Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {subscriptionPlans.map((subscriptionPlan, planIndex) => (
          <motion.div
            key={planIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: planIndex * 0.2 }}
          >
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {subscriptionPlan.planName}
                </CardTitle>
                <CardDescription className="text-center">
                  {subscriptionPlan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-center items-baseline mb-8">
                  <span className="text-5xl font-extrabold">₹{subscriptionPlan.price}</span>
                  <span className="text-muted-foreground ml-1">/{subscriptionPlan.billingFrequency}</span>
                </div>  
                <div className="space-y-4">
                  {subscriptionPlan.features.map((feature, index) => (
                    <motion.div
                      key={feature._id}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">{feature.featureName}</h3>
                        <p className="text-sm text-muted-foreground">{feature.featureDescription}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" 
                  onClick={() => handleStartTrial(subscriptionPlan._id)}
                  className="w-full">
                    Start {subscriptionPlan.trialPeriodDays}-Day Free Trial
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Badge variant="outline" className="text-lg px-4 py-2">
          30-Day Money-Back Guarantee
        </Badge>
      </div>
    </div>
  )
}

