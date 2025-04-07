"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import styles from "../../styling/StakingButton.module.css"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { createPortal } from "react-dom"
import ReferEarnPopup from './ReferEarnPopup'
import api from "../../backend/server"
import { useAppKit } from "@reown/appkit/react"
import { useAccount, useBalance, useReadContract, useWriteContract } from "wagmi"
import Web3 from "web3"
import { ethers, parseUnits,   } from "ethers"
import url from 'url';
import { getClient } from "../../config/blockchain"
import toast from "react-hot-toast"
import { formatUnits, parseEther } from "viem"
import presaleAbi from "../contractABI/presaleAbi.json"
import tokenAbi from "../contractABI/tokenAbi.json"
// setup blockchain here 
const Provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/4558589699cd4522b9c817c99f72ce99");
const web3 = new Web3(Provider);

// This is for changing button logo and name tabs will change the chain(input) name and logo
const tabs = [
  { id: "BUY", label: "BUY", icon: "/assets/icons/coin.pngg" },
  { id: "SELL", label: "SELL", icon: "/assets/icons/usdt.svg" },
]

const currenciesByChain = {
  TG: [{ name: "TG", icon: "/assets/icons/coin.png" }],
  USDT: [{ name: "USDT", icon: "/assets/icons/usdt.svg" }],
}

const BuyNowBox = () => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState("BUY")
  const [sellCurrency, setSellCurrency] = useState(currenciesByChain.USDT[0])
  const [buyCurrency, setBuyCurrency] = useState(currenciesByChain.TG[0])

  // states for managing api data in pre-sale box from backend api (ajax.php)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [nextPrice, setNextPrice] = useState(0)
  const [raisedPrice, setRaisedPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // toast meassages 
  const notifyErrorMsg = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  //web3 data states and logics
  // use appkit for wallet and use isconnected for condition 
  const { open } = useAppKit()
  const { isConnected, address } = useAccount();

  // usdt, allowedUSDT and eth balance of user who connected
  const [usdtBalance, setUSDTBalance] = useState(0);
  const [allowanceUSDT, setAllowanceUSDT] = useState(0);
  const [usdcBalance, setUSDCBalance] = useState(0);
  const [allowanceUSDC, setAllowanceUSDC] = useState(0);
  const [ethBalance, setETHBalance] = useState(0);

  // use usestate for buy amount and buy now button stars
  const [buyAmount, setBuyAmount] = useState(0)
  const [expectedTokens, setExpectedTokens] = useState(0);
  const [buyButtonText, setBuyButtonText] = useState('BUY NOW')
  //set bonus text
  const [bonusBelowText, setBonusBelowText] = useState("Buy minimum of $500 and 5% extra Tokens")
  // use useEffect for fetching data from backend api 
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await api.get("index.php", { responseType: "text" }); // Get HTML as text
        const htmlString = response.data;

        // Parse HTML using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        // Extract values from input fields
        const getValue = (name) => doc.querySelector(`input[name="${name}"]`)?.value || "0";

        setCurrentPrice(getValue("current_price"));
        setNextPrice(getValue("next_price"));
        setRaisedPrice(getValue("usdt_raised"));
        setTotalPrice(getValue("usdt_total"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchInfo();
  }, []);


  // fetch live eth price
  const [ethPriceLive, setEthPriceLive] = useState(0);
  useEffect(() => {
    async function fetchEthPrice() {
      const providerETH = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/4558589699cd4522b9c817c99f72ce99");
      const contractETH = new ethers.Contract(presaleAddress, presaleAbi.abi, providerETH);
      const priceBigInt = await contractETH.getLatestETHPrice();
      setEthPriceLive(priceBigInt.toString());
    }
    fetchEthPrice();
  }, []);


  // token balance of user who connected for stackable
  const [stackableTokenBalance, setStackableTokenBalance] = useState(0);
  // user token balance for claimed from presale
  const [tokenBalance, setTokenBalance] = useState(0);

  const { writeContractAsync } = useWriteContract();

  const presaleAddress = "0x462eed0076dc1b2fe9deea0857df6d1953fe7d46";
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const tokenAddress = "0x888632bb147ba407d85f1881a817c0481ff8dcda";

  // use contract abi 
  // showing how much user who connected will claim data
  const { data: totalAmountInfo } = useReadContract({
    abi: presaleAbi.abi,
    address: presaleAddress,
    functionName: 'userClaimData',
    args: [address],
  })

  // show user who connected all usdt in acc
  const { data: balanceUSDTData } = useReadContract({
    abi: tokenAbi.abi,
    address: usdtAddress,
    functionName: 'balanceOf',
    args: [address],
  })
  // show user who connected all usdt in acc
  const { data: balanceUSDCData } = useReadContract({
    abi: tokenAbi.abi,
    address: usdcAddress,  // Define usdcAddress
    functionName: 'balanceOf',
    args: [address],
  });
  // show user who connected all token in acc
  const { data: balanceTokenData } = useReadContract({
    abi: tokenAbi.abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
  })

  // how much it is capable for buy token
  const { data: allowanceUSDTData } = useReadContract({
    abi: tokenAbi.abi,
    address: usdtAddress,
    functionName: 'allowance',
    args: [address, presaleAddress],
  })
  const { data: allowanceUSDCData } = useReadContract({
    abi: tokenAbi.abi,
    address: usdcAddress,  // Make sure usdcAddress is defined
    functionName: 'allowance',
    args: [address, presaleAddress],
  });

  const switchBuyCurrency = async () =>{
    if(buyCurrency.name == "USDT"){
       setBuyCurrency(currenciesByChain.TG[0])
       setSellCurrency(currenciesByChain.USDT[0])
    }else{
      setBuyCurrency(currenciesByChain.USDT[0])
      setSellCurrency(currenciesByChain.TG[0])
    }
  }
  
  // fetch web3 data 
  const fetchBalance = async () => {
    // Connect to the public RPC provider
    const providerETH = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/4558589699cd4522b9c817c99f72ce99');
    // Create a contract instance with the provider
    const contractETH = new ethers.Contract(presaleAddress, presaleAbi.abi, providerETH);
    try {
      let tokenPrice = await contractETH.presale(1);
      tokenPrice = web3.utils.fromWei(tokenPrice[2].toString(), 'ether');
    } catch (error) {
      console.log('error')
    }

    // how much total token user can claim user wallet is connected
    if (isConnected) {
      try {
        // total purchased token by connected user
        let balance = await contractETH.userClaimData(address);
        balance = web3.utils.fromWei(balance, "ether");
        setTokenBalance(balance)
      } catch (error) {
        console.log('Unable to load user claim data', error)
      }

      // call token contract when user is connected
      const contractToken = new ethers.Contract(tokenAddress, tokenAbi.abi, providerETH);
      // Check user balance of how  many token is remaining from total claimed tokens
      try {
        let balance = await contractToken.balanceOf(address);
        balance = web3.utils.fromWei(balance, "ether");
        setStackableTokenBalance(balance);
      } catch (error) {
        console.log('unable to load token contract', error)
      }
    }
  }

  
  // use use-effect for isConnected and more things for prevent it from running multiple times(infinite loop)
  useEffect(() => {
    if (isConnected) {
      if (totalAmountInfo) {
        const balance = web3.utils.fromWei(totalAmountInfo.toString(), 'ether')
        setTokenBalance(Number(balance));
      }
      if (balanceUSDTData) {
        setUSDTBalance(Number(Number(balanceUSDTData.toString()) / 1e6));
      }
      if (allowanceUSDTData) {
        setAllowanceUSDT(parseFloat(allowanceUSDTData.toString()));
      }
      if (balanceUSDCData) {
        setUSDCBalance(Number(Number(balanceUSDCData.toString()) / 1e6));
      }
      if (allowanceUSDCData) {
        setAllowanceUSDC(parseFloat(allowanceUSDCData.toString()));
      }

      if (balanceTokenData) {
        const stackableBalance = web3.utils.fromWei(balanceTokenData.toString(), "ether");
        setStackableTokenBalance(stackableBalance);
      }
    }
  }, [isConnected, address, balanceUSDTData, totalAmountInfo, allowanceUSDTData, balanceTokenData],)


  

  return (
    <div className="relative text-center w-full h-full">
      <div className="px-4 sm:px-[30px]">
        <h2 className="text-[24px] sm:text-[32px] leading-[29px] sm:leading-[38.4px] font-bold text-white">
          {t("home.buyNowBox.title")}
          <span className="text-[#8E00FF]">$TG</span> {t("home.buyNowBox.now")}
        </h2>
        <h4 className="hidden text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-medium pt-[15px]">
          {t("home.buyNowBox.untilPriceIncrease")}
        </h4>
        {/* Current & Next Price */}
        <div className="hidden mt-5">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.currentPrice")}: {currentPrice}
            </h2>
            <h2 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.nextPrice")}: {nextPrice}
            </h2>
          </div>
          <div className="my-2 sm:my-2.5 bg-[#250142] rounded-[49px] w-full h-[15px]">
            <div
              className="h-full w-[180px] rounded-[11px]"
              style={{
                width: (raisedPrice / totalPrice * 100).toFixed(0) + "%",
                background: "linear-gradient(270deg, #A052FF 0%, #440675 100%)",
              }}
            ></div>
          </div>
          <h3 className="text-[13px] sm:text-[14px] leading-[16.8px] font-normal text-[#C176FF]">
            <span className="text-white/90">{t("home.buyNowBox.raised")}:</span>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(raisedPrice)}/{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}
          </h3>
        </div>
      </div>

      {/* Stackable & Purchased VRN */}
      <div className="mt-5 w-full bg-[#7314C040] px-4">
        <div className="max-w-[300px] sm:max-w-[395px] mx-auto w-full flex items-center justify-between sm:gap-[85px] py-2.5">
          <div>
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-medium mb-[5px]">
            Stackable TG
            </h2>
            <h3 className="text-[#C176FF] text-[13px] sm:text-[14px] leading-[16.8px] font-normal">{stackableTokenBalance}</h3>
          </div>
          <div className="bg-[#842DFF] h-[40px] w-[0.5px]"></div>
          <div>
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-medium mb-[5px]">
            Purchased TG
            </h2>
            <h3 className="text-[#C176FF] text-[13px] sm:text-[14px] leading-[16.8px] font-normal">{tokenBalance}</h3>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-[30px]">
        {/* Choose amount & $VRN you receive */}
        <div className="mt-4 sm:mt-5 flex items-center gap-[15px] sm:gap-5" style={{marginBottom: '2rem'}}>
          {/* Choose amount */}
          <div className="flex flex-col gap-1.5 sm:gap-2 items-start w-full">
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-bold text-white">
              From
            </h2>
            <div className="w-full h-[39px] sm:h-[50px] rounded-md sm:rounded-lg border border-[#8616DF] flex items-center justify-between gap-3 pl-3 sm:pl-4 pr-[3.5px] sm:pr-[5px]">
              <input
                type="text"
                id="inputbuyamount"
                defaultValue={buyAmount}
                placeholder="0.00"
                className="w-full bg-transparent outline-none placeholder:text-white/80 text-white text-[14px] sm:text-base font-normal"
              />
              <Image
                src={buyCurrency.icon || "/placeholder.svg"}
                alt={buyCurrency.name}
                width={30}
                height={30}
                style={{margin: '10px'}}
              />
            </div>
          </div>
         
        </div>

           {/* Listing price */}
           <div className="w-full justify-center flex items-center gap-4 px-5">
          <Image src="/assets/heading-arrow.svg" alt="arrow" width={110} height={1} className="sm:w-[110px] w-[85px]" />
          <div
            className="px-2 sm:px-2.5 py-1 bg-[#9442ED80] rounded-[99px] flex items-center justify-center border border-[#9442ED80]"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <h2 onClick={() => switchBuyCurrency() }  className="text-nowrap text-white text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
            <Image src="/assets/icons/down.png" alt="meta" width={24} height={24} />
            </h2>
          </div>
          <Image
            src="/assets/heading-arrow.svg"
            alt="arrow"
            width={110}
            height={1}
            className="rotate-180 sm:w-[110px] w-[85px]"
          />
        </div>

        <div className="mt-4 sm:mt-5 flex items-center gap-[15px] sm:gap-5">
        
          {/* $VRN you receive */}
          <div className="flex flex-col gap-1.5 sm:gap-2 items-start w-full">
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-bold text-white">
               To
            </h2>
            <div className="w-full h-[39px] sm:h-[50px] rounded-md sm:rounded-lg border border-[#8616DF] flex items-center justify-between px-4 gap-5">
              <span id="expectedTokens" className="text-white">
                {parseFloat(expectedTokens.toFixed(4))}
              </span>
              <Image 
                src={sellCurrency.icon || "/placeholder.svg"}
                alt={sellCurrency.name}
                width={30} 
                height={30} />
            </div>
          </div>
        </div>
        {/* Available Bonus */}
        <div style={{visibility: 'hidden'}} className="space-y-2 sm:space-y-[11px]">
          <h3 className="text-white text-[13px] sm:text-[14px] font-bold text-left">
            {t("home.buyNowBox.availableBonus")}
          </h3>
          <div className="grid grid-cols-3 gap-[9px] sm:gap-[11px] mt-4">
           
          </div>
        </div>
        {/* Connect and  Buy Now */}
        {
          isConnected ? (
            <button
              className={`${styles.stakingButtonBuyNow} ${isHovered ? styles.hovered : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
          
            >
              <div className={styles.gradientBorder} />
              <h3 className={styles.buttonContentBuyNow}>{buyButtonText}</h3>
              <div className={styles.glowEffectBuyNow} />
            </button>
          ) : (
            <button
              className={`${styles.stakingButtonBuyNow} ${isHovered ? styles.hovered : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => open(isConnected ? { view: "Account" } : undefined)}
            >
              <div className={styles.gradientBorder} />
              <h3 className={styles.buttonContentBuyNow}>Connect</h3>
              <div className={styles.glowEffectBuyNow} />
            </button>
          )
        }

      </div>

      {/* Modal */}
      <div className="px-5 sm:px-[30px]">
        <div className="mt-5 flex items-center flex-wrap justify-center sm:justify-between gap-4 sm:gap-3">
          
          <Link href="https://vorn-ai.gitbook.io/" target="_blank" className="flex items-center gap-2 sm:gap-2.5">
            <Image src="/assets/icons/how-to-buy.svg" alt="How to buy" width={16} height={16} />
            <h3 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">How to buy</h3>
          </Link>
          <Link href="https://vorn-ai.gitbook.io/" target="_blank" className="flex items-center gap-2 sm:gap-2.5">
            <Image
              src="/assets/icons/my-wallet-wont-connect.svg"
              alt="My wallet won't connect!"
              width={16}
              height={16}
            />
            <h3 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              My wallet won&apos;t connect!
            </h3>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BuyNowBox

