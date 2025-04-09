import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import stakingAbi from "../../components/contractABI/stakingAbi";
import tokenAbi from "../../components/contractABI/tokenAbi";
import presaleAbi from "../../components/contractABI/presaleAbi";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import Web3 from "web3"

// setup blockchain here 
const Provider = new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/");
const web3 = new Web3(Provider);
let myReferrals = [];
const Leaderboard = () => {


  const { t } = useTranslation();


  // wallet open 
    const {isConnected, address} = useAccount()
  
    const tokenAddress = "0xa0696ffC4B64534d9A8a63aDaF8a1537f5C0c0c6";
  
    const [totalReward, setTotalReward] = useState(0);
    
    const formatNumberWithCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  
    //
  
   // for total reward user will get
  
   // Fetch all user stakes
   const { data: getReferralsInfo } = useReadContract({
     abi: tokenAbi.abi,
     address: tokenAddress,
     functionName: "getReferrals",
     args: [address],
   });
  
    // use use-effect for isConnected and more things for prevent it from running multiple times(infinite loop)
    useEffect(() => {
      if (isConnected) {
  
          if(Array.isArray(getReferralsInfo)){
              myReferrals = getReferralsInfo;
            setTotalReward(Number(getReferralsInfo.length));
          }
        
      }
    }, [isConnected, address, getReferralsInfo],)


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
          {myReferrals.length > 0 ? (
           myReferrals.map((item, index) => (

            <div key={index} className="flex justify-between w-full">
              <div className="py-2.5 px-6 text-left text-[16px] leading-[19.2px] font-medium text-white ">
                {index+1}
              </div>
              <div className="py-2.5 px-4 xl:pl-10 text-[16px] leading-[19.2px] font-medium text-center text-white">
                {item.referrer}
              </div>
              <div className="py-2.5 pr-6 xl:pr-10 text-right text-[16px] leading-[19.2px] font-medium text-white">
              { new Intl.NumberFormat('en-US',{currency: 'USD',}).format(Number(item.tokensEarned),)}
                
              </div>
            </div>

          ))
        )
          :
          (
            <div style={{justifyContent: 'center'}} className="flex justify-between w-full"> No referrals found</div>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;