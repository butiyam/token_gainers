import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const PoweringVORNAI = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("depin.poweringVORN.title1"),
      description: t("depin.poweringVORN.description1"),
      imageSrc: "/assets/de-pin/decentralized_ai_compute_nodes.webp",
      reverse: false,
      marginTop: "mt-[-90px]",
    },
    {
      title: t("depin.poweringVORN.title2"),
      description: t("depin.poweringVORN.description2"),
      imageSrc: "/assets/de-pin/decentralized_cloud_storage_.webp",
      reverse: true,
      marginTop: "mt-[-116px]",
    },
    {
      title: t("depin.poweringVORN.title3"),
      description: t("depin.poweringVORN.description3"),
      imageSrc: "/assets/de-pin/decentralized_energy_grid.webp",
      reverse: false,
      marginTop: "mt-[-150px]",
    },
    {
      title: t("depin.poweringVORN.title4"),
      description: t("depin.poweringVORN.description4"),
      imageSrc: "/assets/de-pin/iot_smart_cities_integration_.webp",
      reverse: true,
      marginTop: "mt-[-200px]",
    },
  ];

  const TimelinePoint = ({ marginTop }) => (
    <div className={`hidden lg:block ${marginTop}`}>
      <div className="absolute left-1/2 -translate-x-1/2 bg-[#6C38F31F] w-[56px] h-[56px] rounded-[300px] p-1 flex items-center justify-center z-10">
        <div
          className="w-[48px] h-[48px] rounded-[300px] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)",
            boxShadow: `0px 1px 3px 0px #6C39F41A, 0px 5px 5px 0px #6C39F417, 0px 12px 7px 0px #6C39F40D, 0px 20px 8px 0px #6C39F403, 0px 32px 9px 0px #6C39F400`,
          }}
        >
          <Image
            src="/assets/icons/star.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#020103] px-6 sm:px-10 pt-[99px] pb-[200px] lg:py-[140px]">
      <h1 className="mx-auto w-full max-w-[650px] px-10 text-center text-[32px] leading-[38px] font-bold text-white md:text-[40px] md:leading-[60px]">
        <span className="text-[#9442ED]">Powering VORN AI</span> with
        Decentralized Infrastructure
      </h1>

      {/* Mobile Design */}
      <div className="lg:mt-[100px] mt-[50px] relative lg:space-y-[200px] space-y-[50px] max-w-[1300px] mx-auto">
        <Line />

        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex items-center flex-col gap-6 lg:gap-10 xl:gap-[100px] ${
              section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            <Image
              src={section.imageSrc}
              alt={section.title}
              width={557}
              height={437}
              className="flex-1"
              loading={index > 1 ? "lazy" : "eager"}
            />
            <TimelinePoint marginTop={section.marginTop} />
            <div
              className={`flex-1 text-center ${
                section.reverse ? "md:text-right" : "md:text-left"
              }`}
            >
              <h2 className="mb-5 text-[28px] leading-[33.6px] font-bold text-white">
                {section.title}
              </h2>
              <p className="text-[18px] leading-[27px] font-normal text-white/80 font-poppins">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoweringVORNAI;

const Line = () => (
  <div className="absolute left-1/2 -translate-x-1/2 xl:mt-[60px] mt-[50px] lg:block hidden">
    <div className="svg-container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 560 2356"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M280 0V232.643C280 244.328 286.179 255.141 296.246 261.074L512.044 388.24C533.639 400.966 533.722 432.173 512.194 445.013L296.096 573.9C286.114 579.853 280 590.619 280 602.242V669V802.5"
          stroke="url(#paint0_radial_963_797)"
          stroke-width="1.5"
        />
        <path
          d="M280 795.5V1637.14C280 1648.83 273.821 1659.64 263.754 1665.57L47.956 1792.74C26.3608 1805.47 26.2784 1836.67 47.8059 1849.51L263.904 1978.4C273.886 1984.35 280 1995.12 280 2006.74V2073.5V2356"
          stroke="url(#paint1_radial_963_797)"
          stroke-width="1.5"
        />
        <defs>
          <radialGradient
            id="paint0_radial_963_797"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(439.649 472.677) rotate(-72.412) scale(312.94 413.275)"
          >
            <stop stop-color="#A761FF" />
            <stop offset="1" stop-color="#490A84" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_963_797"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(120.351 1714.64) rotate(-99.2586) scale(587.738 427.893)"
          >
            <stop stop-color="#A761FF" />
            <stop offset="1" stop-color="#490A84" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
);
