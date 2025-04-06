import Image from "next/image";
import React from "react";

const SectionHeading = ({
  text = "Our Features",
  leftArrowSrc = "/assets/heading-arrow.svg",
  rightArrowSrc = "/assets/heading-arrow.svg",
  iconSrc = "/assets/icons/heading-icon.svg",
}) => {
  return (
    <div className="w-fit px-[10px] mx-auto justify-center flex items-center gap-4 overflow-hidden">
      <Image src={leftArrowSrc} alt="arrow" width={110} height={1} className="sm:w-[110px] w-[100px]" />
      <div
        className="py-1 px-4 sm:pl-1.5 sm:pr-2.5 bg-[#8B5CF666] rounded-[99px] flex items-center gap-2 justify-center border border-[#8B5CF64D]"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Image src={iconSrc} alt="heading-icon" width={20} height={20} />
        <h2 className="text-nowrap text-[#DDD6FE] text-[13px] leading-[15.74px] font-normal">
          {text}
        </h2>
      </div>
      <Image src={rightArrowSrc} alt="arrow" width={110} height={1} className="sm:w-[110px] w-[100px] rotate-180"/>
    </div>
  );
};

export default SectionHeading;
