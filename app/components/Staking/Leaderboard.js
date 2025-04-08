import React from "react";
import { useTranslation } from "react-i18next";

const Leaderboard = () => {
  const { t } = useTranslation();
  const leaderboardData = [
    { id: 1, user: "0x863E...8515", amount: "36474144.43" },
    { id: 2, user: "0xB627...6d32", amount: "26057582.46" },
    { id: 3, user: "0x6Fh2...b916", amount: "26561519.92" },
    { id: 4, user: "0xBe56...A7aA", amount: "10000965.75" },
    { id: 5, user: "0x8f19...b048", amount: "36474144.43" },
    { id: 6, user: "0xB627...6d32", amount: "26561519.92" },
    { id: 7, user: "0xBe56...A7aA", amount: "26057582.46" },
    { id: 8, user: "0x8f19...b048", amount: "36474144.43" },
    { id: 9, user: "0xB627...6d32", amount: "26561519.92" },
  ];

  return (
    <div className="mt-[20px] border border-[#440675] bg-[#0B0015] rounded-[12px] lg:p-[15px] pb-[20px]">
      <h1 className="mt-3 md:mt-1 text-[22px] leading-[28.8px] font-bold lg:text-left text-center mb-[20px] text-white">
        {t("staking.leaderboard.title")}
      </h1>

      {/* Header row as a separate box */}
      <div className="px-2.5 md:px-0">
        <div className="w-full bg-[#1C0035] border border-[#7209C5] rounded-xl px-3 md:p-5 h-[54px] md:h-[60px] flex items-center justify-between text-nowrap">
          <div className="text-left text-white text-[16px] md:text-[18px] leading-[24px] font-medium">
            {t("staking.leaderboard.sr")}
          </div>
          <div className="pl-10 text-white text-[16px] md:text-[18px] leading-[24px] font-medium text-center">
            {t("staking.leaderboard.user")}
          </div>
          <div className="text-right text-white text-[16px] md:text-[18px] leading-[24px] font-medium">
            {t("staking.leaderboard.amount")}
          </div>
        </div>
      </div>

      {/* Data rows wrapper */}
      <div className="overflow-hidden mt-4 md:mt-[20px]">
        <div className="w-full">
          {leaderboardData.map((item) => (
            <div key={item.id} className="flex justify-between w-full">
              <div className="py-2.5 px-6 text-left text-[16px] leading-[19.2px] font-medium text-white ">
                {item.id}
              </div>
              <div className="py-2.5 px-4 xl:pl-10 text-[16px] leading-[19.2px] font-medium text-center text-white">
                {item.user}
              </div>
              <div className="py-2.5 pr-6 xl:pr-10 text-right text-[16px] leading-[19.2px] font-medium text-white">
              { new Intl.NumberFormat('en-US',{currency: 'USD',}).format(Number(item.amount),)}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;