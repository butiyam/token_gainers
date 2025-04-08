import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Web3 from 'web3'
import presaleAbi from "../contractABI/presaleAbi.json"
import { useAccount, useReadContract } from "wagmi";

const Provider = new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
const web3 = new Web3(Provider)

const Referral = () => {

  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const presaleAddress = "0x462eed0076dc1b2fe9deea0857df6d1953fe7d46"
  const {address, isConnected} = useAccount()
  const [referralLink, setReferralLink] = useState("https://tokengainers.com?referral")
  const [referralStats] = useState(
      {
          referrals: 0,
          bonus: "0.00"
      }
  );
  // use abi
  const { data: getReferralsInfo } = useReadContract({
      abi: presaleAbi.abi,
      address: presaleAddress,
      functionName: 'getReferrals',
      args:[address],
    })
  
    const { data: getTotalReferralEarnInfo } = useReadContract({
      abi: presaleAbi.abi,
      address: presaleAddress,
      functionName: 'getTotalReferralEarnings',
      args:[address],
    })

    // use useEffect
    useEffect(()=>{
      if(typeof window !== 'undefined' && isConnected){
          const protocol = window.location.protocol;
          const hostname = window.location.hostname;
          let url = protocol+hostname;
          if(hostname==='localhost') url = protocol+hostname+':3000'
          setReferralLink(url+'?referral='+address)
      }
    }, [isConnected, address, getTotalReferralEarnInfo, getReferralsInfo, referralStats])
  

  return (
    <div className="mt-[20px] border border-[#440675] bg-[#0B0015] rounded-[12px] px-[10px] py-[15px] lg:p-[20px] text-white">
      <h1 className="text-[22px] leading-[28.8px] font-bold mb-[15px] lg:mb-[20px] lg:text-left text-center">
        {t("staking.referral.title")}
      </h1>

      <div className="staking-section border-[#440675] border bg-[#1C0035] flex lg:flex-col flex-row lg:items-start items-center justify-between pb-2.5 pt-[14px] px-5 rounded-xl">
        <h2 className="text-[18px] leading-[24px] font-normal mb-[2px]">
          {t("staking.referral.totalReferrals")}
        </h2>
        <h3 className="text-[26px] font-normal">0</h3>
      </div>

      <div className="mt-[15px] staking-section border-[#440675] border bg-[#1C0035] flex lg:flex-col flex-row lg:items-start items-center justify-between pb-2.5 pt-[14px] px-5 rounded-xl">
        <h2 className="text-[18px] leading-[24px] font-normal mb-[2px]">
          {t("staking.referral.totalEarnedAmount")}
        </h2>
        <h3 className="text-[26px] font-normal">0</h3>
      </div>

      {/* Referral Link Section */}
      <div className="mt-[15px] border border-[#7209C5] rounded-xl p-[15px] lg:py-3 lg:px-5 flex items-start md:items-center md:flex-row flex-col gap-2.5 md:gap-5">
        <h2 className="text-sm sm:text-lg font-normal font-poppins">
          {t("staking.referral.yourReferralLink")}
          <Link href={referralLink} className="ml-1" target="_blank">
            {referralLink}
          </Link>
        </h2>
        <button onClick={handleCopy} className="relative">
          <Image
            src="/assets/icons/copy.svg"
            alt="copy"
            width={24}
            height={24}
          />
          {copied && (
            <span className="absolute top-[20px] left-0 bg-[#7209C5] text-white text-sm px-2 py-1 rounded">
              {t("staking.referral.copied")}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Referral;
