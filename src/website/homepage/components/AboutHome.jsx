import { Button } from "@/components/ui/button"
import AOS from "aos";
import "aos/dist/aos.css";
import { Check } from "lucide-react"
import about1 from "../../images/homeAbout1.webp"
import { useEffect } from "react";
import TryFreeButton from "@/website/demoForm/TryFreeButton";
export default function AboutHome({ index }) {
  const isOdd = index % 2 !== 0;
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className={`max-w-[83rem] mx-auto px-4 my-10 sm:py-12 grid md:grid-cols-2 gap-20 items-center ${isOdd ? 'md:flex-row-reverse' : ''}`}>
      {/* Left side - Graph */}
      <div data-aos="fade-right" className="relative sm:w-[80%]">
        <img
          src={about1}
          alt="User activity graph showing increasing trend"
         
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right side - Content */}
      <div data-aos="fade-down" className="space-y-6">
        <h2 className="text-4xl text-center sm:text-left md:text-6xl font-semibold text-[#272a6b] leading-tight">
          Lets know the our all-in-on features
        </h2>

        <p className="text-gray-600  text-center sm:text-left text-lg sm:max-w-[85%]">
          Receive detailed insights on all your numbers in real-time. See where visitors are coming from and optimize
          your campaigns for conversion. Filter statistics with a single click and connect to Google Search.
        </p>

        <div className="space-y-4">
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

        {/* <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-full text-lg">
          Try for Free
        </Button> */}

       <div className="flex sm:justify-start justify-center">
       <TryFreeButton/>
       </div>
      </div>
    </div>
  )
}