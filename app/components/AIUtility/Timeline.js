import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Timeline = () => {
  const { t } = useTranslation();

  const TimelinePoint = () => (
    <div className="absolute left-1/2 -translate-x-1/2 bg-[#6C38F31F] w-[56px] h-[56px] rounded-[300px] p-1 flex items-center justify-center z-10">
      <div
        className="w-[48px] h-[48px] rounded-[300px] flex items-center justify-center"
        style={{
          background:
            "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)",
          boxShadow: `0px 1px 3px 0px #6C39F41A, 0px 5px 5px 0px #6C39F417, 0px 12px 7px 0px #6C39F40D, 0px 20px 8px 0px #6C39F403, 0px 32px 9px 0px #6C39F400`,
        }}
      >
        <Image src="/assets/icons/star.svg" alt="star" width={24} height={24} />
      </div>
    </div>
  );

  const TimelineCard = ({ title, description }) => (
    <div
      className="w-full lg:max-w-[578px] rounded-[10px] p-[1px]"
      style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, #959595 0deg, #2F2F2F 36.1deg, #2F2F2F 77.33deg, #2F2F2F 131.17deg, #2F2F2F 163.25deg, #959595 180.4deg, #2F2F2F 196.46deg, #2F2F2F 238.85deg, #2F2F2F 299.56deg, #959595 360deg)",
      }}
    >
      <div
        className="rounded-[9px] py-6 md:py-[39px] px-[15px] md:pl-[33px] md:pr-[23px]"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #371866 100%)",
          boxShadow: "0px 0px 50px 0px #8B5CF680 inset",
        }}
      >
        <h2 className="text-white text-[28px] md:text-[32px] font-bold leading-[33.6px] md:leading-[31px] mb-5">
          {title}
        </h2>
        <p className="text-white/80 text-[18px] leading-[27px] font-normal font-poppins">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#020103] pt-[100px] lg:pt-[54px] pb-[200px] relative px-5">
      {/* Center line */}
      <div className="lg:block hidden absolute left-1/2 top-[250px] xl:top-[300px] bottom-[380px] xl:bottom-[420px] w-[2px] bg-[#252525] -translate-x-1/2" />

      <div className="max-w-[1240px] mx-auto px-4 lg:block hidden">
        <div className="space-y-32">
          {/* First timeline item */}
          <div className="relative grid grid-cols-2 gap-16 items-center">
            <TimelinePoint />
            <div className="flex justify-end mr-1">
              <TimelineCard
                title={t("aiUtility.timeline.first.title")}
                description={t("aiUtility.timeline.first.description")}
              />
            </div>
            <div className="flex justify-start">
              <Image
                src="/assets/ai/ai_powered_compute_grid_.webp"
                alt="AI-Powered Compute Grid"
                width={715}
                height={453}
              />
            </div>
          </div>

          {/* Second timeline item */}
          <div className="relative grid grid-cols-2 gap-16 items-center">
            <TimelinePoint />
            <div className="flex justify-end">
              <Image
                src="/assets/ai/ai_yield_management_system_.webp"
                alt="AI Yield Management System"
                width={521}
                height={539}
              />
            </div>
            <div className="flex justify-start">
              <TimelineCard
                title={t("aiUtility.timeline.second.title")}
                description={t("aiUtility.timeline.second.description")}
              />
            </div>
          </div>

          {/* Third timeline item */}
          <div className="relative grid grid-cols-2 gap-16 items-center">
            <TimelinePoint />
            <div className="flex justify-end">
              <TimelineCard
                title={t("aiUtility.timeline.third.title")}
                description={t("aiUtility.timeline.third.description")}
              />
            </div>
            <div className="flex justify-start">
              <Image
                src="/assets/ai/ai_optimized_energy_marketplace_.webp"
                alt="AI-Optimized Energy Marketplace"
                width={705}
                height={499}
              />
            </div>
          </div>
            {/* Fourth timeline item */}
            <div className="relative grid grid-cols-2 gap-16 items-center">
            <TimelinePoint />
            <div className="flex justify-start">
              <Image
                src="/assets/ai/ai_powered_compute_grid_.webp"
                alt="AI-Powered Compute Grid"
                width={715}
                height={453}
              />
            </div>
            <div className="flex justify-end mr-1">
              <TimelineCard
                title={t("aiUtility.timeline.fourth.title")}
                description={t("aiUtility.timeline.fourth.description")}
              />
            </div>
           
          </div>
             {/* Fifth timeline item */}
             <div className="relative grid grid-cols-2 gap-16 items-center">
            <TimelinePoint />
           
            <div className="flex justify-start">
              <TimelineCard
                title={t("aiUtility.timeline.fifth.title")}
                description={t("aiUtility.timeline.fifth.description")}
              />
            </div>
            <div className="flex justify-end">
              <Image
                src="/assets/ai/ai_yield_management_system_.webp"
                alt="AI Yield Management System"
                width={521}
                height={539}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="lg:hidden block">
        {/* First timeline item */}
        <div className="flex flex-col gap-5 items-center">
          <div className="flex justify-end">
            <TimelineCard
              title={t("aiUtility.timeline.first.title")}
              description={t("aiUtility.timeline.first.description")}
            />
          </div>
          <div className="flex justify-start">
            <Image
              src="/assets/ai/ai_powered_compute_grid_.webp"
              alt="AI-Powered Compute Grid"
              width={715}
              height={453}
            />
          </div>
        </div>

         {/* Second timeline item */}
         <div className="mt-10 flex flex-col-reverse gap-5 items-center">
            <div className="flex justify-end">
              <Image
                src="/assets/ai/ai_yield_management_system_.webp"
                alt="AI Yield Management System"
                width={521}
                height={539}
              />
            </div>
            <div className="flex justify-start">
              <TimelineCard
                title={t("aiUtility.timeline.second.title")}
                description={t("aiUtility.timeline.second.description")}
              />
            </div>
          </div>

          {/* Third timeline item */}
          <div className="mt-10 flex flex-col gap-5 items-center">
            <div className="flex justify-end">
              <TimelineCard
                title={t("aiUtility.timeline.third.title")}
                description={t("aiUtility.timeline.third.description")}
              />
            </div>
            <div className="flex justify-start">
              <Image
                src="/assets/ai/ai_optimized_energy_marketplace_.webp"
                alt="AI-Optimized Energy Marketplace"
                width={705}
                height={499}
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Timeline;
