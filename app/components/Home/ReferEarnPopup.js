import React, { useEffect, useState } from 'react'
import { Copy, DollarSign, Sun } from 'lucide-react'
import Web3 from 'web3'
import { useAccount, useReadContract } from 'wagmi'
import presaleAbi from "../../components/contractABI/presaleAbi.json"

// load bloackchain
const Provider = new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
const web3 = new Web3(Provider)
const ReferEarnPopup = () => {
    const presaleAddress = "0x462eed0076dc1b2fe9deea0857df6d1953fe7d46"
    const {address, isConnected} = useAccount()
    const [referralLink, setReferralLink] = useState("https://vorn.ai?referral")
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
        <div className="relative z-10 bg-[#1A0A2E] border border-[#8616DF] rounded-lg p-5 w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold">Refer & Earn</h2>
            </div>

            <div className="space-y-4">
                <p className="text-white/90 text-sm">Share your referral link and earn 5% of your friends&lsquo; purchases!</p>

                <div className="bg-[#250142] rounded-md p-3 flex items-center justify-between">
                    <span className="text-white/90 text-sm truncate">{referralLink}</span>
                    <button
                        className="ml-2 text-[#C176FF] hover:text-[#A052FF] transition-colors"
                        onClick={() => {
                            navigator.clipboard.writeText(referralLink)
                            alert("Referral link copied to clipboard!")
                        }}
                    >
                        <Copy size={20} />
                    </button>
                </div>

                <div className="bg-[#7314C040] p-3 rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#A052FF] rounded-full p-2">
                            <Sun size={20} color="white" />
                        </div>
                        <div>
                            <h3 className="text-white text-sm font-medium">Total Referrals</h3>
                            <p className="text-[#C176FF] text-sm">0</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#7314C040] p-3 rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#A052FF] rounded-full p-2">
                            <DollarSign size={20} color="white" />
                        </div>
                        <div>
                            <h3 className="text-white text-sm font-medium">Total Earnings</h3>
                            <p className="text-[#C176FF] text-sm">0 $Mine X</p>
                        </div>
                    </div>
                </div>

                <button
                    className="hidden w-full py-3 rounded-lg font-medium text-white"
                    style={{
                        background: "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)",
                    }}
                >
                    My Referrals
                </button>
            </div>
        </div>
    )
}

export default ReferEarnPopup
