import Image from "next/image";
import React from "react";
import LocalizedButtonLink from "../Button";
import { useTranslation } from "react-i18next";

const RWAContent = () => {
  const { t } = useTranslation();

  const featuresData = [
    {
      id: 1,
      title: t("rwa.rwaContent.features.title1"),
      description: t("rwa.rwaContent.features.description1"),
      imageSrc: "/assets/rwa/1.webp",
      reversed: false,
    },
    {
      id: 2,
      title: t("rwa.rwaContent.features.title2"),
      description: t("rwa.rwaContent.features.description2"),
      imageSrc: "/assets/rwa/2.webp",
      reversed: true,
    },
    {
      id: 3,
      title: t("rwa.rwaContent.features.title3"),
      description: t("rwa.rwaContent.features.description3"),
      imageSrc: "/assets/rwa/3.webp",
      reversed: false,
    },
    {
      id: 4,
      title: t("rwa.rwaContent.features.title4"),
      description: t("rwa.rwaContent.features.description4"),
      imageSrc: "/assets/rwa/4.webp",
      reversed: true,
    },
  ];

  return (
    <div className="px-5">
      <div className="py-[50px] md:py-[80px] lg:py-[113px] max-w-[986px] mx-auto w-full flex items-center justify-between lg:flex-row flex-col gap-10 lg:gap-4">
        <Image
          src="/assets/rwa/about-rwa.webp"
          alt="white-image"
          width={425}
          height={410}
          className="rounded-[10px] mix-blend-screen bg-transparent"
        />
        <div className="lg:max-w-[488px] lg:text-left text-center">
          <h2 className="text-white text-[32px] leading-[48px] font-bold mb-5">
            {t("rwa.rwaContent.title")}
          </h2>
          <p className="text-white/80 text-[18px] leading-[27px] font-normal font-poppins">
            {t("rwa.rwaContent.description")}
          </p>
        </div>
      </div>

      <h1 className="pt-[80px] lg:pt-0 max-w-[650px] mx-auto w-full text-center text-white text-[32px] md:text-[40px] leading-[48px] md:leading-[60px] font-bold">
        <span className="text-[#9442ED]">
          {t("rwa.rwaContent.heading.start")}
        </span>{" "}
        {t("rwa.rwaContent.heading.end")}
      </h1>

      <div className="pt-8 md:mt-[100px] max-w-[1236px] w-full mx-auto pb-[300px] h-full">
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            className={`${
              index === 1
                ? "my-6 lg:flex-row flex-col-reverse gap-6"
                : "mt-5  last:lg:flex-row last:flex-col-reverse"
            } flex items-center lg:items-start lg:flex-row flex-col w-full gap-6 lg:h-[400px]`}
          >
            {feature.reversed ? (
              <>
                <div
                  className="relative lg:flex-1 h-full rounded-[10px] p-[1px]"
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
                      {feature.title}
                    </h2>
                    <p className="text-white/80 font-normal font-poppins text-[18px] leading-[27px]">
                      {feature.description}
                    </p>
                    <div className="mt-5">
                      <LocalizedButtonLink
                        href="/staking"
                        translationKey="rwa.rwaContent.buttonText"
                      />
                    </div>
                  </div>
                </div>
                <Image
                  src={feature.imageSrc}
                  alt="image"
                  width={472}
                  height={400}
                  className="rounded-[10px] border border-[#7E0ADB] min-h-[400px] object-cover"
                />
              </>
            ) : (
              <>
                <Image
                  src={feature.imageSrc}
                  alt="image"
                  width={472}
                  height={400}
                  className="rounded-[10px] border border-[#7E0ADB]  min-h-[400px] object-cover"
                />
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
                      {feature.title}
                    </h2>
                    <p className="text-white/80 font-normal font-poppins text-[18px] leading-[27px]">
                      {feature.description}
                    </p>
                    <div className="mt-5">
                      <LocalizedButtonLink
                        href="/staking"
                        translationKey="rwa.rwaContent.buttonText"
                      />
                    </div>
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

export default RWAContent;
