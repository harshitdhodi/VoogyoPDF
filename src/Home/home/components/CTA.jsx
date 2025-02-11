import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-blue-800
    ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Start Your Travel Journey for Free</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of happy travelers who have transformed their journeys with Voogyo's free plan.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
          Get Started Now
        </Button>
      </div>
    </section>
  )
}

