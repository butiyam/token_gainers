import React, { useState } from "react";
import BuyNowBox from "./BuyNowBox";
import styles from "../../styling/StakingButton.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import $ from "jquery";

const Hero = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  
  const fetchInfo = async () => {

    const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

const countDown =  new Date("2025-05-25").getTime(),
  x = setInterval(function() {    

    const now = new Date().getTime(),
          distance = countDown - now;

           //Zeros
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000); 

       days = (days.toLocaleString(undefined,{minimumIntegerDigits: 2}));  
       hours = (hours.toLocaleString(undefined,{minimumIntegerDigits: 2}));  
       minutes = (minutes.toLocaleString(undefined,{minimumIntegerDigits: 2}));
       seconds = (seconds.toLocaleString(undefined,{minimumIntegerDigits: 2}));
       if(document.getElementById("days")){
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;                          
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
      }
       //do something later when date is reached
       if (distance < 0) {
 
         //document.getElementById("countdown").style.display = "none";
         document.getElementById("days").innerText = '00';
         document.getElementById("hours").innerText = '00';                          
         document.getElementById("minutes").innerText = '00';
         document.getElementById("seconds").innerText = '00';
         clearInterval(x);
       }
    //seconds
  }, 0)

 }
// fetchInfo();

  return (
    <div className="flex items-center lg:items-start justify-between lg:flex-row flex-col gap-[52px] lg:gap-5">
      <div className="lg:max-w-[609px] text-white">
        <div className="mb-[30px] w-fit px-[14px] h-[42px] bg-[#170326] rounded-[50px] border border-[#FFFFFF26] flex items-center gap-2 justify-center animate-pulse-shadow">
          <div className="bg-[#ffff00] px-[5px] w-fit h-[18px] rounded-[40px] flex items-center justify-center inter text-black text-[10px] leading-[26px] tracking-[-0.01em] font-bold">
            {t("home.hero.new")}
          </div>
          <h2 className="text-[#FFF] text-[16px] leading-[26px] font-normal tracking-[-0.01em]">
            FIRA Launch On Exchange
          </h2>
        </div>
        <div className="mb-[30px] w-fit px-[14px] h-[42px] bg-[#170326] rounded-[50px] border border-[#FFFFFF26] flex items-center gap-2 justify-center animate-pulse-shadow">
          
          <div id="days" className="bg-[#ffff00] px-[5px] w-fit h-[18px] rounded-[40px] flex items-center justify-center inter text-black text-[10px] leading-[26px] tracking-[-0.01em] font-bold">
            00
          </div>
          :
          <div id="hours" className="bg-[#ffff00] px-[5px] w-fit h-[18px] rounded-[40px] flex items-center justify-center inter text-black text-[10px] leading-[26px] tracking-[-0.01em] font-bold">
            00
          </div>
          :
          <div id="minutes" className="bg-[#ffff00] px-[5px] w-fit h-[18px] rounded-[40px] flex items-center justify-center inter text-black text-[10px] leading-[26px] tracking-[-0.01em] font-bold">
            00
          </div>
          :
          <div id="seconds" className="bg-[#ffff00] px-[5px] w-fit h-[18px] rounded-[40px] flex items-center justify-center inter text-black text-[10px] leading-[26px] tracking-[-0.01em] font-bold">
            00
          </div>
        </div>
        
        <h1 className="text-[40px] leading-[48px] sm:text-[45px] lg:text-[50px] lg:leading-[74px] font-bold bg-clip-text"
          style={{
            background:
              "linear-gradient(291.9deg, #FFFFFF 62.65%, #000000 108.48%)",
            WebkitBackgroundClip: "text",
          }}
        >
         Earn 5% Daily with <span style={{color: '#ffff00'}} className="font-bold">Mine X</span> VIP Staking Program
        </h1>

        <p className="my-[30px] text-[22px] leading-[30px] font-normal font-poppins text-white lg:max-w-[496px]">
           Stake <span style={{color: '#ffff00'}} className="font-bold">MINEX</span> coins and experience secure, reliable, and consistent returns with our exclusive staking opportunity.
        </p>

        <div className="flex items-center gap-[30px]">
          <Link href="/en/staking" 
            className={`${styles.stakingButtonAudit}  ${isHovered ? styles.hovered : ""
              }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.gradientBorder} />
            <div className={styles.buttonContentAudit}>
              {t("home.hero.staking")}
            </div>
            <div className={styles.glowEffectAudit} />
          </Link>

          <Link href='https://github.com' target="_blank">
            <button
              className="relative text-[16px] leading-[19.2px] font-medium w-[134px] h-[47px] rounded-xl text-white transition-all duration-300 shadow-[0px_21px_39.3px_rgba(132,0,255,0.33),0px_0px_6px_1px_#9B59FF_inset]"
              style={{
                background:
                  "radial-gradient(50.91% 97.54% at 50% 2.46%, rgba(160, 82, 255, 0.01) 0%, rgba(115, 0, 255, 0.01) 100%)",
              }}
            >
              {t("home.hero.whitepaper")}
              <span
                className="absolute inset-0 rounded-xl p-[1px] pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, #440675 0%, #CDA4FF 100%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
              ></span>
            </button>
          </Link>
        </div>
      </div>

      <div
        className="h-full w-full py-[20px] sm:py-[30px] sm:w-[504px] sm:min-w-[504px] rounded-[15px] sm:rounded-[20px] bg-[#15012D0D] border border-[#842DFF]"
        style={{ backdropFilter: "blur(100px)" }}
      >
        <BuyNowBox />
      </div>
    </div>
  );
};

export default Hero;
