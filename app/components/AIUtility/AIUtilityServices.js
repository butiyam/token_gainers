import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const AIUtilityServices = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-10 md:pt-[92px] w-full px-4">
      <div className="max-w-[721px] mx-auto w-full flex items-center flex-col justify-center">
        <h2 className="text-[32px] lg:text-[40px] leading-[48px] lg:leading-[60px] font-bold text-center text-white mb-[0px] mt-[30px]">
          <span className="text-[#9442ED]">
            {t("aiUtility.services.title")}
          </span>{" "}
          {t("aiUtility.services.subtitle")}
        </h2>
        <Image
          src="/assets/ai/ai-ulility-service.webp"
          alt="ai-utility-services"
          width={721}
          height={583}
        />
      </div>
    </div>
  );
};

export default AIUtilityServices;
