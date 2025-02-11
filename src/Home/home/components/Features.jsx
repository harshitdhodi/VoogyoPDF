import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CirclePattern } from "./CirclePattern";
import image1 from "../images/iPad2.png";
import image2 from "../images/iPad.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const featuresData = [
  {
    title: "What is Voogyo?",
    description: [
      "Voogyo is an advanced travel agency management software designed to streamline booking processes, automate workflows, and enhance customer experiences.",
      "It provides an all-in-one solution for travel agencies, tour operators, and travel consultants, offering features such as itinerary planning, customer management, invoicing, real-time pricing, and seamless integrations with global travel services.",
    ],
    buttonText: "Discover our best ever services.",
    buttonLink: "#",
    image: image1,
  },
  {
    title: "Why Choose Voogyo?",
    description: [
      "Voogyo offers a comprehensive suite of tools to streamline your travel planning.",
      "From intelligent itinerary planning to real-time updates, Voogyo has everything you need to make your trips seamless and enjoyable.",
    ],
    buttonText: "Learn More",
    buttonLink: "#",
    image: image2,
  },
];

export default function Features() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll-triggered animation for each feature
    gsap.utils.toArray(".feature").forEach((feature) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 50 }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%", // Start when the feature reaches 80% from the top
            end: "top 20%",   // End when it reaches 20% from the top
            scrub: true,      // Smooth scrolling animation in both directions
            toggleActions: "play reverse play reverse", // Play forward on scroll down and reverse on scroll up
          },
        }
      );
    });
  }, []);

  return (
    <section className="about-us sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {featuresData.map((feature, index) => (
          <div key={index} className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20 feature">
            {/* Image on left for even indexes, right for odd */}
            {index % 2 === 0 ? (
              <>
                <div className="relative">
                  <div className="absolute -z-10 top-0 right-0 w-full h-full">
                    <div className="absolute right-0 w-3/4 h-full rounded-full bg-sky-400/20" />
                    <CirclePattern />
                  </div>
                  <div className="relative sm:-mr-7">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={800}
                      height={500}
                      className="relative z-10"
                      priority={true}
                    />
                  </div>
                </div>
                <div className="sm:space-y-12 space-y-8 sm:ml-8 relative">
                  <CirclePattern />
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{feature.title}</h1>
                  <div className="space-y-4 text-justify text-muted-foreground">
                    {feature.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))}
                  </div>
                  <Button className="bg-sky-400 hover:bg-sky-500 text-white px-8" asChild>
                    <a href={feature.buttonLink}>{feature.buttonText}</a>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="sm:space-y-12 space-y-8 relative">
                  <CirclePattern />
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{feature.title}</h1>
                  <div className="space-y-4 text-muted-foreground">
                    {feature.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))}
                  </div>
                  <Button className="bg-sky-400 hover:bg-sky-500 text-white px-8" asChild>
                    <a href={feature.buttonLink}>{feature.buttonText}</a>
                  </Button>
                </div>
                <div className="relative -ml-7">
                  <div className="absolute -z-10 top-0 right-0 w-full h-full">
                    <div className="absolute right-0 w-3/4 h-full rounded-full bg-sky-400/20" />
                    <CirclePattern />
                  </div>
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={800}
                    height={500}
                    className="relative z-10"
                    priority={true}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
