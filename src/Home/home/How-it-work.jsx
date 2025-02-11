import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, FileText, Wand2, Heart } from "lucide-react";
import FeatureCard from "./components/Feature-card";

export default function HowItWorks() {
  const features = [
    {
      icon: Monitor,
      title: "Fully responsive",
      description: "Our platform adapts seamlessly to any device, ensuring a smooth experience on desktops, tablets, and mobile screens.",
    },
    {
      icon: FileText,
      title: "Well documented",
      description: "Comprehensive documentation provides clear guidance for easy setup, customization, and troubleshooting.",
    },
    {
      icon: Wand2,
      title: "Easy to use",
      description: "Designed with simplicity in mind, our intuitive interface makes managing travel operations quick and hassle-free.",
    },
    {
      icon: Heart,
      title: "Clean codes",
      description: "Built with high-quality, well-structured code to ensure optimal performance, scalability, and easy maintenance.",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll-triggered animation for each feature card
    gsap.utils.toArray(".feature-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%", // Start when the card is 80% from the top of the viewport
            end: "top 60%",   // End when the card reaches 20% from the top
            scrub: true,      // Smooth scrolling animation in both directions
            toggleActions: "play reverse play reverse", // Play forward on scroll down and reverse on scroll up
          },
        }
      );
    });
  }, []);

  return (
    <section className="how-work sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center sm:mt-10 sm:mb-16 mt-8">
          <h2 className="text-4xl font-bold mb-4">How it works ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Streamline bookings, manage trips, and enhance customer experiences—all in one place!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
