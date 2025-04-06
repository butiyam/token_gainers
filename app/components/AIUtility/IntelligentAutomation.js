import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const IntelligentAutomation = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#020103] w-full py-[43px] px-5">
      <div className="mt-1 max-w-[1130px] w-full mx-auto flex items-center lg:flex-row flex-col gap-10 md:gap-[72px]">
        <div className="relative w-full max-w-[569px] lg:min-w-[569px] mx-auto">
          <video
            className="w-full rounded-lg shadow-lg"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/ai/ai-animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="max-w-[488px]">
          <h2 className="text-white text-[32px] leading-[48px] font-bold mb-5 text-center lg:text-left">
            {t("aiUtility.intelligentAutomation.title")}
          </h2>
          <p className="text-white/80 text-[18px] leading-[27px] font-normal font-poppins text-center lg:text-left">
            {t("aiUtility.intelligentAutomation.description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntelligentAutomation;
