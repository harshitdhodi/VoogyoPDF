import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WhyChooseCard() {
  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
        </svg>
      ),
      title: "More Customizable Than Other Travel CRMs",
      description:
        "We tailor our travel CRM to fit your business, customizing workflows, processes, and dashboards to match your needs",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 8h18" />
        </svg>
      ),
      title: "Best Travel CRM In The Market",
      description:
        "Empower your field teams with CRMtravel™ for route planning, tracking, attendance management, and auto-assigning leads",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12H7" />
        </svg>
      ),
      title: "Cleaner, Organized User Experience",
      description:
        "Enhance efficiency with a cleaner, organized user experience. Sales reps can focus on tasks with a permission module and dashboard for seamless workflow",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      title: "Responsive Support Team",
      description:
        "Every business, big or small, gets a dedicated account manager. Contact our team via chat, email, or call and get quick answers—minutes or hours, not days!",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="min-h-[600px]  flex items-center justify-center p-4">
      <div className="relative">
        {/* Large circular gradient background */}
        <div
          className="absolute  sm:w-[550px]  sm:h-[550px] bg-gradient-to-b from-[#fad9d4]
          via-[#9c7ffa]  rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            zIndex: -1,
          }}
        /> 

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl relative">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-50 backdrop-blur-sm hover:shadow-lg transition-shadow rounded-3xl border-b-5 border-[#545aff]"
              data-aos={index % 2 === 0 ? "fade-down-right" : "fade-down-left"}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
