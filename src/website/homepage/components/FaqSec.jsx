"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "How to using Saafiy for Business?",
    answer:
      "On the other hand, the strengthening and devel structure largely the creation of financial and administrative the beginning of the daily work on the formation of the position provides raspecialists.",
  },
  {
    id: 2,
    question: "How secure is SaaS?",
    answer:
      "SaaS applications are hosted in secure, monitored environments with robust security measures including encryption, regular security audits, and compliance with industry standards. Data is backed up regularly and protected against unauthorized access.",
  },
  {
    id: 3,
    question: "What are the advantages of using SaaS?",
    answer:
      "SaaS offers numerous benefits including lower upfront costs, automatic updates, scalability, accessibility from anywhere, reduced IT maintenance, and faster deployment compared to traditional software installations.",
  },
];

export default function FAQSec() {
  const [activeId, setActiveId] = useState(null);

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1
        data-aos="fade-up"
        className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#1e2875]"
      >
        Frequently Asked Questions
      </h1>

      <div
      data-aos="fade-up" // Cycle through AOS classes
      className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={item.id}
       
            className={`rounded-4xl border sm:py-3 px-6 border-gray-300 overflow-hidden transition-all duration-500 ${
              activeId === item.id
                ? "bg-gradient-to-b from-[#6B77E5] to-[#4A57B4] text-white"
                : "bg-gradient-to-b from-white to-[#f9f9f9]"
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex justify-between items-center w-full p-4 text-left"
            >
              <span className="sm:text-lg  font-medium">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeId === item.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeId === item.id && (
              <div className="px-4 pb-4">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
