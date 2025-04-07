import React from "react";
import SectionHeading from "../SectionHeading";
import LocalizedButtonLink from "../Button";
import { useTranslation } from "react-i18next";

const featuresData = [
  {
    id: 1,
    title: "home.ourFeatures.aiTitle",
    description: "home.ourFeatures.aiDescription",
    videoSrc: "/assets/features-video-1.mp4",
    reversed: false,
    link: "/unified-ai"
  },
  {
    id: 2,
    title: "home.ourFeatures.depinTitle",
    description: "home.ourFeatures.depinDescription",
    videoSrc: "/assets/features-video-2.mp4",
    reversed: true,
    link: "/de-pin"
  },
  
];

const OurFeatures = () => {
  const { t } = useTranslation();

  return (
    <div id="features" className="pt-[20px] sm:pt-[70px] pb-20 px-[18px]">
      <SectionHeading text={t("home.ourFeatures.title")} />
      <h1 className="my-[25px] text-[32px] sm:text-[40px] leading-[44px] sm:leading-[44px] font-bold text-white text-center">
        <span className="text-[#9442ED]">Mine X:</span> Take a Step Toward Your Financial Freedom
      </h1>
      <p className="max-w-[698px] mx-auto text-center w-full text-[18px] leading-[27px] font-normal font-poppins text-white/80">
        {t("home.ourFeatures.description")}
      </p>

      <div className="mt-[60px] sm:mt-[50px] max-w-[1236px] mx-auto w-full">
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            className={`${index === 1 ? "my-5 lg:flex-row flex-col-reverse" : ""
              } flex items-start xl:items-center lg:flex-row flex-col w-full gap-5 h-full `}
          >
            {feature.reversed ? (
              <>
                <div
                  className="relative flex-1 h-full rounded-[10px] p-[1px]"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, #959595 0deg, #2F2F2F 36.1deg, #2F2F2F 77.33deg, #2F2F2F 131.17deg, #2F2F2F 163.25deg, #959595 180.4deg, #2F2F2F 196.46deg, #2F2F2F 238.85deg, #2F2F2F 299.56deg, #959595 360deg)",
                  }}
                >
                  <div
                    className="rounded-[10px] py-[25px] sm:py-[40px] md:py-[60px] px-4 md:px-10 flex items-start justify-center flex-col w-full h-full"
                    style={{
                      background:
                        "linear-gradient(180deg, #000000 0%, #371866 100%)",
                      boxShadow: "0px 0px 50px 0px #8B5CF680 inset",
                    }}
                  >
                    <h2 className="text-[28px] sm:text-[32px] leading-[31px] font-bold text-white mb-5">
                      {t(feature.title)}
                    </h2>
                    <p className="text-white/80 font-normal font-poppins text-[18px] leading-[27px]">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[472px] h-[400px] border border-[#7E0ADB] rounded-[10px]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-[10px]"
                  >
                    <source src={feature.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            ) : (
              <>
                <div className="w-full lg:w-[472px] h-[400px] border border-[#7E0ADB] rounded-[10px]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-[10px]"
                  >
                    <source src={feature.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div
                  className="relative flex-1 h-full rounded-[10px] p-[1px]"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, #959595 0deg, #2F2F2F 36.1deg, #2F2F2F 77.33deg, #2F2F2F 131.17deg, #2F2F2F 163.25deg, #959595 180.4deg, #2F2F2F 196.46deg, #2F2F2F 238.85deg, #2F2F2F 299.56deg, #959595 360deg)",
                  }}
                >
                  <div
                    className="rounded-[10px] py-[25px] sm:py-[40px] md:py-[60px] px-4 md:px-10 flex items-start justify-center flex-col w-full h-full"
                    style={{
                      background:
                        "linear-gradient(180deg, #000000 0%, #371866 100%)",
                      boxShadow: "0px 0px 50px 0px #8B5CF680 inset",
                    }}
                  >
                    <h2 className="text-[28px] sm:text-[32px] leading-[31px] font-bold text-white mb-5">
                      {t(feature.title)}
                    </h2>
                    <p className="text-white/80 font-normal font-poppins text-[18px] leading-[27px]">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurFeatures;