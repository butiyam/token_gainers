import React from "react";
import SectionHeading from "../SectionHeading";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const BuiltOn = () => {
  const { t } = useTranslation();
  
  // Left to right slider logos
  const logosLeftToRight = [
    "/assets/built-on/1.svg",
    "/assets/built-on/2.svg",
    "/assets/built-on/3.svg",
    "/assets/built-on/4.svg",
    "/assets/built-on/5.svg",
    "/assets/built-on/6.svg",
    "/assets/built-on/7.svg",
    "/assets/built-on/8.svg",
    "/assets/built-on/9.svg",
    "/assets/built-on/10.svg",
    "/assets/built-on/11.svg",
  ];
  
  // Right to left slider logos
  const logosRightToLeft = [
    "/assets/built-on/12.svg",
    "/assets/built-on/13.svg",
    "/assets/built-on/14.svg",
    "/assets/built-on/15.svg",
    "/assets/built-on/16.svg",
    "/assets/built-on/17.svg",
    "/assets/built-on/18.svg",
    "/assets/built-on/19.svg",
    "/assets/built-on/20.svg",
    "/assets/built-on/21.svg",
    "/assets/built-on/22.svg",
  ];

  // Create duplicated sets for continuous animations
  const logoSetLTR = [...logosLeftToRight, ...logosLeftToRight, ...logosLeftToRight];
  const logoSetRTL = [...logosRightToLeft, ...logosRightToLeft, ...logosRightToLeft];

  return (
    <div
      className="py-20"
      style={{
        background: `radial-gradient(32.52% 50% at 50% 50%, rgba(132, 45, 255, 0.25) 0%, rgba(2, 1, 3, 0.25) 100%), linear-gradient(0deg, #000000, #000000)`,
      }}
    >
      <div className="max-w-[1248px] mx-auto w-full">
        <SectionHeading text={t("home.builtOn.title")} />
        <h1
          className="mt-[30px] px-4 mb-[45px] text-center text-[32px] sm:text-[40px] leading-[44px] font-bold"
          style={{
            background: `linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(0, 0, 0, 0) 59.75%, rgba(0, 0, 0, 0.5) 100%)`,
            backgroundBlendMode: "multiply",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <span
            style={{
              WebkitTextFillColor: "#9442ED",
            }}
          >
            {t("home.builtOn.poweredBy")}
          </span>{" "}
          {t("home.builtOn.innovation")}
        </h1>
        
        {/* Left to right slider */}
        <div className="relative overflow-hidden">
          {/* Left shadow overlay */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[100px] z-10"
            style={{
              background:
                "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          ></div>
          {/* Right shadow overlay */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[100px] z-10"
            style={{
              background:
                "linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          ></div>
          {/* Animated container */}
          <div className="slider-track-ltr">
            <div className="flex gap-6 sm:gap-[39px]">
              {logoSetLTR.map((logo, index) => (
                <div key={`ltr-${index}`} className="flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`technology-${(index % logosLeftToRight.length) + 1}`}
                    draggable="false"
                    width={104}
                    height={104}
                    className="w-[80px] h-[80px] sm:w-[104px] sm:h-[104px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right to left slider */}
        <div className="relative overflow-hidden mt-6 md:mt-10">
          {/* Left shadow overlay */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[100px] z-10"
            style={{
              background:
                "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          ></div>
          {/* Right shadow overlay */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[100px] z-10"
            style={{
              background:
                "linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          ></div>
          {/* Animated container */}
          <div className="slider-track-rtl">
            <div className="flex gap-6 sm:gap-[39px]">
              {logoSetRTL.map((logo, index) => (
                <div key={`rtl-${index}`} className="flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`technology-${(index % logosRightToLeft.length) + 1}`}
                    draggable="false"
                    width={104}
                    height={104}
                    className="w-[80px] h-[80px] sm:w-[104px] sm:h-[104px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CSS Animation styles */}
        <style jsx>{`
          @keyframes scroll-ltr {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(
                calc(-104px * ${logosLeftToRight.length} - 39px * ${logosLeftToRight.length})
              );
            }
          }
          @keyframes scroll-rtl {
            0% {
              transform: translateX(
                calc(-104px * ${logosRightToLeft.length} - 39px * ${logosRightToLeft.length})
              );
            }
            100% {
              transform: translateX(0);
            }
          }
          .slider-track-ltr {
            animation: scroll-ltr 30s linear infinite;
            width: max-content;
            /* Ensure animation never pauses */
            animation-play-state: running !important;
          }
          .slider-track-rtl {
            animation: scroll-rtl 30s linear infinite;
            width: max-content;
            /* Ensure animation never pauses */
            animation-play-state: running !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BuiltOn;