import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import hero1 from "../../images/hero1.webp";

export function Hero() {
    return (
        <div className="grid grid-cols-[60%_40%]  gap-12 px-6 py-16 max-w-[84rem] mx-auto">
            <div className="flex flex-col justify-center gap-6">
                <span className="bg-[#545aff] w-fit px-5 text-white rounded-full text-lg py-1">About Us</span>
                <h1 className="text-5xl font-bold text-[#272a6b] leading-tight">
                    Run your entire business from using one platform
                </h1>
                <h3 className="text-2xl text-[#272a6b] font-semibold">
                    Commitment to innovation and sustainability
                </h3>
                <p className="text-gray-600 text-lg">
                    At Hive, we understand that managing a business efficiently requires seamless coordination and streamlined processes. That’s why we’ve developed a to the cutting edge. That empowers you to take control of your operations to boost productivity, and elevate your business to new heights.
                </p>
                <div className="flex gap-4">
                    <h3 className="text-2xl font-semibold text-[#272a6b]">Voogyo Impact in Figures</h3>
                </div>
                <div className="flex w-full items-center gap-16 mt-4">
                    <div>
                        <p className="text-[80px] font-semibold text-[#545aff]">95%</p>
                        <p className="text-[18px] text-gray-500">Cool Number</p>
                    </div>
                    <div>
                        <p className="text-[80px] font-semibold text-[#545aff]">4.5%</p>
                        <p className="text-[18px] text-gray-500">Reviews on Trustpilot</p>
                    </div>
                    <div>
                        <p className="text-[80px] font-semibold text-[#545aff]">80%</p>
                        <p className="text-[18px] text-gray-500">Daily Active Engagement</p>
                    </div>
                </div>
            </div>
            <div className="relative flex justify-end">
                <img src={hero1} alt="Business Management Illustration" className="w-full object-cover" />
            </div>
        </div>
    );
}
