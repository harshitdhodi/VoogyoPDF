"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function TryFreeButton() {
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        name: "",
        mobileNumber: "",
        countryCode: "+1", // Default country code
        selectedSubdomain: "",
        gstNumber: "",
        couponCode: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            selectedSubdomain: name === "companyName" ? value.toLowerCase().replace(/\s+/g, "-") : prevState.selectedSubdomain,
        }));
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

            const response = await axios.post("https://rnddigital.voogyo.com/api/v1/create-basic-agency", payload);

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

    return (
        <Dialog className="w-full">
            {/* Button to open modal */}
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-emerald-500 hover:bg-emerald-600 overflow-y-hidden  text-white px-5 sm:px-8 sm:py-6 py-3 rounded-full text-sm sm:text-lg" >Try for Free</Button>
            </DialogTrigger>

            {/* Modal Content */}
            <DialogContent className="w-full max-w-[70%] p-6 bg-white rounded-lg shadow-lg">

                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Request Your Free Demo</DialogTitle>
                    <DialogDescription>Fill in the details to get started.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="  w-full mx-auto p-6 space-y-6">
                    {/* Full Name & Email */}
                    <div className="grid md:grid-cols-2 w-full gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[#272a6b] text-lg">
                                Full Name <span className="text-green-500">*</span>
                            </Label>
                            <Input id="name" name="name" type="text" placeholder="John Doe" required value={formData.name} onChange={handleInputChange} className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#272a6b] text-lg">
                                Email Address <span className="text-green-500">*</span>
                            </Label>
                            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required value={formData.email} onChange={handleInputChange} className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
                        </div>
                    </div>

                    {/* Mobile Number & Company Name */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="mobileNumber" className="text-[#272a6b] text-lg">
                                Mobile Number <span className="text-green-500">*</span>
                            </Label>
                            <PhoneInput
                                country="in"
                                enableSearch={true}
                                value={formData.mobileNumber}
                                onChange={handlePhoneChange}
                                inputProps={{
                                    name: "mobileNumber",
                                    id: "mobileNumber",
                                    required: true,
                                    className: "w-full mt-3 py-4 pl-16 pr-4 text-lg rounded-2xl border border-gray-400", // Increased left padding
                                }}
                                countryCodeEditable={false}
                                placeholder="Enter mobile number"
                                containerClass="relative w-full"
                                buttonClass="absolute left-2 top-[2.15rem] transform bg-white" // Adjusted positioning and removed border
                                buttonStyle={{ // Add custom button styles
                                    border: 'none',
                                    padding: '0 6px',
                                    background: 'transparent'
                                }}
                                inputClass="w-full text-sm"
                            />


                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-[#272a6b] text-lg">
                                Company Name
                            </Label>
                            <Input id="companyName" name="companyName" type="text" placeholder="Acme Corporation" value={formData.companyName} onChange={handleInputChange} className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
                        </div>
                    </div>

                    {/* GST Number & Coupon Code */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="gstNumber" className="text-[#272a6b] text-lg">
                                GST Number (Optional)
                            </Label>
                            <Input id="gstNumber" name="gstNumber" type="text" placeholder="Enter GST Number" value={formData.gstNumber} onChange={handleInputChange} className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="couponCode" className="text-[#272a6b] text-lg">
                                Coupon Code (Optional)
                            </Label>
                            <Input id="couponCode" name="couponCode" type="text" placeholder="Enter Coupon Code (if any)" value={formData.couponCode} onChange={handleInputChange} className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
                        </div>
                    </div>

                    {/* Subdomain */}
                    <div className="space-y-2">
                        <Label htmlFor="selectedSubdomain" className="text-[#272a6b] text-lg">
                            Subdomain
                        </Label>
                        <Input id="selectedSubdomain" name="selectedSubdomain" type="text" placeholder="auto-filled-subdomain" value={formData.selectedSubdomain} readOnly className="mt-3 py-7 rounded-2xl border-gray-400 w-full" />
                    </div>

                    {/* Error & Success Messages */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && (
                        <p className="flex items-center text-green-500 text-sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {success}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-full text-lg w-1/4">
                        Submit Now
                    </button>
                </form>

            </DialogContent>
        </Dialog>
    );
}
