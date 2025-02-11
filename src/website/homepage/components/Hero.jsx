import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "./Button";
import { Star } from "lucide-react";
import hero1 from "../../images/hero1.webp";
import hero2 from "../../images/labelHero.png";
import bg from "../../images/bgGrid.png";
import FreeDemoModal from "@/website/demoForm/DemoForm";

export function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img
        src={bg}
        alt="Background Grid"
        className="absolute -top-[16%] inset-0 w-full h-full object-fill -z-10"
      />

      <div className="sm:grid flex  flex-col-reverse overflow-y-hidden lg:grid-cols-[40%_60%] gap-12 px-6 mx-auto relative">
        {/* Left Content */}
        <div
          className="lg:flex  relative lg:top-[10%] lg:left-[20%] flex-col justify-center gap-6"
          data-aos="fade-right"
        >
          <h1 data-aos="fade-up" className="text-3xl text-center sm:text-left sm:mt-0 md:text-4xl lg:text-6xl font-bold text-[#272a6b] leading-tight">
            Manage your entire business from a{" "}
            <span className="block">
              single <span className="text-[#545aff]">Platform</span>
            </span>
          </h1>
          <p className="text-gray-600  text-center sm:text-left sm:w-full mt-2 text-lg">
            Experience the ultimate business management solution that seamlessly integrates CRM, time tracking, and project
            management.
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            {/* <Button>Request a demo</Button> */}
            <FreeDemoModal/>
            {/* <Button variant="outline">Get started free</Button> */}
          </div>
          <div className="sm:flex-row flex-col flex mb-10 sm:mb-0  justify-center items-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">Based on 1,000+ reviews from</span>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="relative xl:-right-[15%] flex sm:w-[100vh]"
          data-aos="fade-left"
        >
          <img
            src={hero1}
            alt="Business Management Illustration"
            className="w-full block object-cover lg:hidden"
          />
          <img
            src={hero2}
            alt="Business Management Illustration"
            className="w-[100vh] h-[92vh]  hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
