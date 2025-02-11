import { CreditCard, FileText, Receipt, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhyChooseCard from "./WhyChooseCard"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import TryFreeButton from "@/website/demoForm/TryFreeButton";
export default function WhyChooseSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

    return (
        <div
        data-aos="fade-up"
        >


            <div className=" max-w-[82rem]
             mx-auto px-4 ">
                <h2 className="text-center md:text-4xl text-3xl sm:text-6xl font-semibold text-[#272a6b] mt-16 mb-5 sm:mb-10">Why Choose  Us</h2>
                <div
                    className="sm:flex justify-between items-center gap-20
                 "
                >
                    <WhyChooseCard />

                    {/* Content */}
                    <div className="space-y-6 sm:w-1/2
                    ">
                        <h2
                        data-aos="zoom-in"
                        className="text-2xl text-center sm:text-4xl font-bold text-[#272a6b] lg:text-5xl">Excellent business value of service</h2>
                        <p className="text-gray-600 text-center">
                            Receive detailed insights on all your numbers in real-time. See where visitors are coming from and
                            optimize your campaigns for conversion. Filter statistics with a single click and connect to Google
                            Search.
                        </p>
                       
                        <div className="flex justify-center sm:justify-start">
                        <TryFreeButton/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

