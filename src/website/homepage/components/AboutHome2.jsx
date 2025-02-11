import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import AOS from "aos";
import "aos/dist/aos.css";
import about2 from "../../images/homeAbout2.webp"
import { useEffect } from "react";
import TryFreeButton from "@/website/demoForm/TryFreeButton";
export default function AboutHome2({ index }) {
  const isOdd = index % 2 !== 0;
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div
      className={`max-w-[83rem] mx-auto px-4 my-10 pt-8 sm:pt-12 grid md:grid-cols-2 gap-20 items-center ${isOdd ? 'md:flex-row-reverse' : ''} overflow-hidden`}
    >
      {/* Left Content */}
      <div data-aos="fade-up" className="space-y-6">
        <h2 className="text-3xl text-center sm:text-4xl md:text-5xl font-semibold text-[#272a6b] leading-tight">
          Speed up your analysis
        </h2>

        <p
          data-aos="fade-left"
          className="text-gray-600 text-center text-lg max-w-full sm:max-w-[90%]"
        >
          Receive detailed insights on all your numbers in real-time. See where visitors are coming from and optimize
          your campaigns for conversion. Filter statistics with a single click and connect to Google Search.
        </p>

        <div data-aos="fade-up" className="space-y-4">
          {[
            "Automated renewal tracking and reminders",
            "Powerful filters and search to access information quickly",
            "Folder structure to stay organized",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-violet-600" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

       <div className="flex justify-center sm:justify-start">
         {/* Try for Free */}
         <TryFreeButton data-aos="flip-left" />
       </div>
      </div>

      {/* Right Image */}
      <div data-aos="zoom-in" className="relative w-full max-w-full sm:max-w-[80%] overflow-hidden">
        <img
          src={about2}
          alt="User activity graph showing increasing trend"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
