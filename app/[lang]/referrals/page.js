"use client";
import React, { use, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import useLanguage from "../../hooks/useLanguage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Referral from "../../components/Staking/Referral";
import Leaderboard from "../../components/Staking/Leaderboard";
import { useTranslation } from "react-i18next";



const Referrals = () => {
  useLanguage();
  const { t } = useTranslation();



  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <div className="pt-[130px] lg:pt-[140px] pb-[167px] px-4 sm:px-[25px]">
        <div
          className="w-full max-w-[1160px] mx-auto rounded-[20px] lg:py-7 p-[15px] lg:px-[20px] bg-[#10002080] border border-[#8616DF]"
          style={{ backdropFilter: "blur(14px)" }}
        >
         

          {/* Referral & Leaderboard */}
          <div className="grid grid-rows-1 lg:grid-cols-2 gap-[20px]">
            <Referral />
            <Leaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </I18nextProvider>
  );
};

export default Referrals;
