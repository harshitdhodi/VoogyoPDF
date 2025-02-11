"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import img from "../images/bgImg.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import gsap from "gsap";

export default function FreeDemo() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    name: "",
    mobileNumber: "",
    countryCode: "+1", // Default country code
    selectedSubdomain: "",
    gstNumber: "", // New GST field
    couponCode: "", // Optional Coupon Code
  });


  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };

      if (name === "companyName") {
        updatedFormData.selectedSubdomain = value.toLowerCase().replace(/\s+/g, "-");
      }

      return updatedFormData;
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData((prevState) => ({
      ...prevState,
      mobileNumber: phone,
    }));
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobileNumber: `${formData.countryCode}${formData.mobileNumber}`,
        agencyName: formData.companyName,
        subdomainName: formData.selectedSubdomain,
        gstNumber: formData.gstNumber,
      };

      if (formData.couponCode) {
        payload.couponCode = formData.couponCode;
      }

      const response = await axios.post("rnddigital.voogyo.com/api/v1/create-basic-agency", payload);

      console.log("Form submitted successfully", response.data);
      setSuccess("Your demo request has been successfully submitted. We will contact you shortly.");

      setFormData({
        companyName: "",
        email: "",
        name: "",
        mobileNumber: "",
        countryCode: "+1",
        selectedSubdomain: "",
        gstNumber: "",
        couponCode: "",
      });
    } catch (err) {
      console.error("Error submitting form", err);
      setError("Failed to submit the form. Please try again.");
    }
  };

  useEffect(() => {
    gsap.from(".left-content", {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".right-form", {
      x: 200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section id="free-demo" className="contact-us py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <img src={img} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#49cdfc] opacity-0"></div>
      </div>
      <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-50 mb-12">Experience Voogyo's Free Demo</h2>
        <div className="flex flex-wrap gap-16 -mx-4">
          <div className="left-content w-full md:w-[35%] px-4 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold mb-6 text-white">Complimentary Plan Features:</h3>
            <ul className="list-disc pl-6 mb-8 space-y-3 text-white">
              <li>Intelligent Itinerary Planning for up to 3 trips annually</li>
              <li>Essential Real-time Updates</li>
              <li>Fundamental Budget Tracking</li>
              <li>Email Support Assistance</li>
            </ul>
            <p className="text-white mt-4">
              Discover how Voogyo can revolutionize your travel planning experience. Our free demo provides a glimpse
              into the powerful features that await you.
            </p>
          </div>

          <div className="right-form w-full max-w-4xl mx-5 sm:w-[55%] bg-white py-6 px-4 md:px-9 opacity-90 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center md:text-left">
              Request Your Free Demo
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <PhoneInput
                  country="in"
                  enableSearch={true}
                  value={formData.mobileNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "mobileNumber",
                    id: "mobileNumber",
                    required: true,
                    className: "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  }}
                  containerClass="w-full"
                />
              </div>

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  type="text"
                  placeholder="Enter GST Number"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                <Input
                  id="couponCode"
                  name="couponCode"
                  type="text"
                  placeholder="Enter Coupon Code (if any)"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="selectedSubdomain">Subdomain</Label>
                <Input
                  id="selectedSubdomain"
                  name="selectedSubdomain"
                  type="text"
                  placeholder="auto-filled-subdomain"
                  value={formData.selectedSubdomain}
                  readOnly
                />
              </div>

              {error && <div className="col-span-2 text-red-500 text-sm">{error}</div>}
              {success && (
                <div className="col-span-2 flex items-center text-green-500 text-sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {success}
                </div>
              )}

              <div className="col-span-2 flex justify-end">
                <Button
                  type="submit"
                  className="w-full md:w-1/3 bg-[#00bbff] shadow-lg text-white py-2 rounded-md hover:bg-[#009acd] transition"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
