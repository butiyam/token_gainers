"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SectionHeading from "../SectionHeading";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const FAQData = [
  {
    question: "home.faqs.question1",
    answer: "home.faqs.answer1",
  },
  {
    question: "home.faqs.question2",
    answer: "home.faqs.answer2",
  },
  {
    question: "home.faqs.question3",
    answer: "home.faqs.answer3",
  },
  {
    question: "home.faqs.question4",
    answer: "home.faqs.answer4",
  },
  {
    question: "home.faqs.question5",
    answer: "home.faqs.answer5",
  },
];

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const handleClick = (clickedIndex) => {
    setOpenIndex(clickedIndex === openIndex ? openIndex : clickedIndex);
  };

  return (
    <div
      id="faqs"
      className="px-4 md:px-5 pt-[40px] md:pt-20 pb-[83px] md:pb-[120px] relative"
      style={{
        background: `radial-gradient(32.52% 50% at 50% 50%, rgba(132, 45, 255, 0.25) 0%, rgba(2, 1, 3, 0.25) 100%)`,
      }}
    >
      <SectionHeading text={t("home.faqs.title")} />
      <h1 className="my-[25px] text-[32px] md:text-[40px] leading-[44px] font-bold text-white text-center">
        {t("home.faqs.subtitle")}
      </h1>
      <div className="max-w-[1090px] mx-auto space-y-4 mt-8 md:mt-[60px]">
        {FAQData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-2xl p-[15px] md:px-[36px] md:py-[16px] transition-all duration-500 ease-in-out ${
                isOpen ? "bg-purple-900/20" : "bg-purple-900/10"
              } backdrop-blur-xl overflow-hidden cursor-pointer border border-[#7E0ADB]`}
              style={
                isOpen
                  ? {
                      background:
                        "linear-gradient(180deg, rgba(139, 92, 246, 0) 20.83%, rgba(139, 92, 246, 0.2) 100%)",
                    }
                  : {}
              }
              onClick={() => handleClick(index)}
            >
              <button
                className="w-full text-left flex items-center justify-between relative"
                aria-expanded={isOpen}
              >
                <span className="text-white text-[18px] leading-[27px] font-semibold font-poppins">
                  {t(faq.question)}
                </span>
                <div
                  className={`transition-transform duration-300 ${
                    isOpen ? "" : "rotate-180"
                  }`}
                >
                  <Image
                    src="/assets/icons/faq-arrow.svg"
                    alt="faq-arrow"
                    width={24}
                    height={24}
                  />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "pt-[14px] max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-white/80 text-base md:text-[18px] leading-[27px] font-poppins pr-5">
                  {t(faq.answer)}
                </div>
              </div>

              {/* Border and Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isOpen || "hover:opacity-100"
                } ${
                  isOpen ? "opacity-100" : "opacity-0"
                } border border-purple-500/30 shadow-[0_0_15px_-3px_rgba(147,51,234,0.3)] pointer-events-none`}
              />

              {/* Inner Shadow */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
