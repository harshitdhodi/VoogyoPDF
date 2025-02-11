import { Users, LayoutDashboard, Receipt } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import block from "../../images/block.webp";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "./Button";

const PillarsData = [
  {
    title: "Lead Management",
    bgColor: "bg-blue-50",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    desc: "Streamline lead capture with our all-in-one lead generation feature. Collect leads from multiple sources like - Facebook, Instagram, WhatsApp & Google Sheets.",
    aos: "fade-up",
  },
  {
    title: "Follow-Ups",
    bgColor: "bg-purple-50",
    icon: <LayoutDashboard className="w-8 h-8 text-purple-600" />,
    desc: "Our advanced query management system helps you efficiently track queries, payments, and follow-ups. Receive alerts for unattended queries and ensure nothing slips through the cracks.",
    aos: "fade-down",
  },
  {
    title: "Quotation Builder",
    bgColor: "bg-green-50",
    icon: <Receipt className="w-8 h-8 text-green-600" />,
    desc: "Easily generate quotations using our fully automated master system, seamlessly calculating taxes, subtotals, and totals.",
    aos: "fade-up",
  },
  {
    title: "Masters",
    bgColor: "bg-orange-50",
    icon: <Users className="w-8 h-8 text-orange-600" />,
    desc: "Simplify data management with our all-in-one master data feature, allowing you to effortlessly handle destinations, hotels, activities, sightseeing, transfers, and documents.",
    aos: "fade-down",
  },
  {
    title: "Employee Management",
    bgColor: "bg-purple-50",
    icon: <LayoutDashboard className="w-8 h-8 text-purple-600" />,
    desc: "Manage all the employees(team members) with their role, permissions, salary monlty wise and their achievements.",
    aos: "fade-up",
  },
  {
    title: "Documents Management",
    bgColor: "bg-green-50",
    icon: <Receipt className="w-8 h-8 text-green-600" />,
    desc: "Manage all the important documents in the system.",
    aos: "fade-down",
  },
  {
    title: "Innovation Focus",
    bgColor: "bg-orange-50",
    icon: <Users className="w-8 h-8 text-orange-600" />,
    aos: "fade-up",
  },
  {
    title: "Operations",
    bgColor: "bg-blue-50",
    icon: <Receipt className="w-8 h-8 text-green-600" />,
    desc: "View team requests for proposals, reservation, confirmation along with your voucher and much more.",
    aos: "fade-down",
  },
];

export default function StrategicPillars() {
  
  const location = useLocation(); // Get current URL
  const filteredData = location.pathname === "/features" ? PillarsData : PillarsData.slice(0, 4);
 
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      <div className="sm:flex items-center">
        <img src={block} alt="" className="h-fit" />
        <div className="flex items-center justify-center sm:w-[50%]">
          <h2
            data-aos="fade-up"
            className="text-center max-w-xl overflow-hidden md:text-4xl  lg:text-6xl mb-10 sm:mb-0 text-3xl font-bold text-[#272a6b]"
          >
            Our pillars for strategic success
          </h2>
        </div>
      </div>
      <div className="max-w-[83rem] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((pillar, index) => (
            <div
              key={index}
              data-aos={pillar.aos}
              data-aos-delay={index * 200} // Adds a slight delay for each item in sequence
              className={`${pillar.bgColor} rounded-4xl px-6 sm:py-16 py-5 flex flex-col items-center text-center`}
            >
              <div className="mb-4 w-16 h-16 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-[#1E1B4B] text-xl font-semibold mb-4">
                {pillar.title}
              </h3>
              <p className="text-gray-600 text-justify mb-4">
                {pillar.desc || "Turn customer data into needs and pain points. Transcribe, analyze."}
              </p>
              {/* <a
                href="#"
                className="text-[#1E1B4B] font-medium inline-flex items-center hover:underline"
              >
                Learn More
                <span className="ml-2">→</span>
              </a> */}
            </div>
          ))}
        </div>
        {location.pathname !== "/features" && (
        <div className="flex justify-center items-center">
          <Link to="/features">
            <Button className="rounded-full py-2 px-10 mt-8 bg-blue-50 hover:bg-[#32B768] hover:text-white text-purple-900">
              View More
            </Button>
          </Link>
        </div>
      )}
      </div>
    </>
  );
}
