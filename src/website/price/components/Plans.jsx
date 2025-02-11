"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Beginner",
      price: { monthly: "Free", annually: "Free" },
      description: "Up to 3,000 words / month",
      features: ["5 personal projects", "Smart quick add", "Integrate email, calendar, and more"],
      buttonVariant: "outline",
    },
    {
      name: "Started",
      price: { monthly: "$19.00", annually: "$190.00" },
      description: "Up to 3,000 words / month",
      features: ["5 personal projects", "Smart quick add", "Integrate email, calendar, and more"],
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: { monthly: "$39.00", annually: "$390.00" },
      description: "Up to 3,000 words / month",
      features: ["5 personal projects", "Smart quick add", "Integrate email, calendar, and more"],
      buttonVariant: "outline",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className={`text-sm ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}>Pay Monthly</span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`text-sm ${isAnnual ? "text-primary" : "text-muted-foreground"}`}>Pay Annually</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <card key={plan.name} className="flex p-4 flex-col rounded-4xl bg-[#f5f8ff]">
            <CardHeader>
              <CardTitle className="text-xl text-[#272a6b]">{plan.name}</CardTitle>
              <p className="text-sm text-gray-500">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="text-6xl font-bold text-[#4117ff] ">{isAnnual ? plan.price.annually : plan.price.monthly}</div>
              <div className="h-[1px] mb-8 my-5 w-full bg-gray-300"></div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 ">
                    <Check className="h-4 w-4 text-primary border" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.buttonVariant} className="w-full rounded-full py-6 text-md border-[#1fab70] hover:bg-[#1fab70] hover:text-white text-[#1fab70]">
                Get Started
              </Button>
            </CardContent>
          </card>
        ))}
      </div>
    </div>
  )
}

