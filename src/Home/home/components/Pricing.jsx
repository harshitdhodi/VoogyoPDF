import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["Smart Itinerary Planning", "Real-time Updates", "Basic Support"],
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["All Basic features", "Budget Tracking", "Priority Support", "Offline Access"],
    cta: "Go Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["All Pro features", "Custom Integrations", "Dedicated Account Manager", "Team Collaboration"],
    cta: "Contact Sales",
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Travel Companion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price}</p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">{plan.cta}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

