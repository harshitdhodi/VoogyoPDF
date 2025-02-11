"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <>  
     <div className="max-w-6xl rounded-[50px] my-16 mx-auto shadow-2xl">
        <form onSubmit={handleSubmit} className="max-w-5xl py-16 mx-auto p-6 space-y-6">
          {/* First Name & Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[#272a6b] text-lg">
                First Name (Listing) <span className="text-green-500">*</span>
              </Label>
              <Input id="firstName" placeholder="First Name" required className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[#272a6b] text-lg">
                Last Name (Listing) <span className="text-green-500">*</span>
              </Label>
              <Input id="lastName" placeholder="Last Name" required className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
            </div>
          </div>

          {/* Email & Number */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#272a6b] text-lg">
                Email <span className="text-green-500">*</span>
              </Label>
              <Input id="email" type="email" placeholder="Type your email" required className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number" className="text-[#272a6b] text-lg">
                Number <span className="text-green-500">*</span>
              </Label>
              <Input id="number" type="tel" placeholder="Type your number" required className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
            </div>
          </div>

          {/* Message (Textarea) */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#272a6b] text-lg">
              Message <span className="text-green-500">*</span>
            </Label>
            <Textarea id="message" placeholder="Write your message here.." required className="mt-3 py-7 rounded-2xl border-gray-400 w-full min-h-[150px]" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white  py-4 rounded-full text-lg w-1/4">
            Submit Now
          </button>
        </form>
      </div>
    </>
  )
}

