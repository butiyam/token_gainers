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
import $ from "jquery"
import { formatUnits, parseEther } from "viem"

import presaleAbi from "../contractABI/presaleAbi.json"
import tokenAbi from "../contractABI/tokenAbi.json"

// setup blockchain here 
const Provider = new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/");
const web3 = new Web3(Provider);

// This is for changing button logo and name tabs will change the chain(input) name and logo
const tabs = [
  { id: "BUY", label: "BUY", icon: "/assets/icons/x.png" },
  { id: "SELL", label: "SELL", icon: "/assets/icons/usdt.svg" },
]

const currenciesByChain = {
  TG: [{ name: "TG", icon: "/assets/icons/x.png" }],
  FIRA: [{ name: "FIRA", icon: "/assets/icons/f.png" }],
  USDT: [{ name: "USDT", icon: "/assets/icons/usdt.svg" }],
}

const BuyNowBox = () => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState(true);
  
  const [sellCurrency, setSellCurrency] = useState(currenciesByChain.TG[0])
  const [buyCurrency, setBuyCurrency] = useState(currenciesByChain.USDT[0])

  // states for managing api data in pre-sale box from backend api (ajax.php)
  const [currentPrice, setCurrentPrice] = useState(0)
  
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
  const [allowanceCoin, setAllowanceCoin] = useState(0);

  // use usestate for buy amount and buy now button stars
  const [buyAmount, setBuyAmount] = useState(0)
  const [expectedTokens, setExpectedTokens] = useState(0);
  const [buyButtonText, setBuyButtonText] = useState('BUY NOW')


  // token balance of user who connected for stackable
  const [stackableTokenBalance, setStackableTokenBalance] = useState(0);
  // user token balance for claimed from presale
  const [tokenBalance, setTokenBalance] = useState(0);

  const { writeContractAsync } = useWriteContract();

  const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
  const tokenAddress = "0xa0696ffC4B64534d9A8a63aDaF8a1537f5C0c0c6";


  // show user who connected all usdt in acc
  const { data: balanceUSDTData } = useReadContract({
    abi: tokenAbi.abi,
    address: usdtAddress,
    functionName: 'balanceOf',
    args: [address],
  })

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
    args: [address, tokenAddress],
  })

    // how much it is capable for sell token
    const { data: allowanceCoinData } = useReadContract({
      abi: tokenAbi.abi,
      address: tokenAddress,
      functionName: 'allowance',
      args: [address, tokenAddress],

    })

    
  const switchTab = async (state) => {
    setActiveTab(state);
    if(buyCurrency.name == "USDT"){
      if(state){
       setBuyCurrency(currenciesByChain.TG[0])
       setSellCurrency(currenciesByChain.USDT[0])
       setBuyButtonText("SELL NOW");
      }else{
        setBuyCurrency(currenciesByChain.FIRA[0])
        setSellCurrency(currenciesByChain.USDT[0])
        setBuyButtonText("SELL NOW");
      }
    }else{

      if(state){
      setBuyCurrency(currenciesByChain.USDT[0])
      setSellCurrency(currenciesByChain.TG[0])
      setBuyButtonText("BUY NOW");
      }else{
        setBuyCurrency(currenciesByChain.USDT[0])
        setSellCurrency(currenciesByChain.FIRA[0])
        setBuyButtonText("BUY NOW");
      }
    }
  
  
  }

  const switchBuyCurrency = async () => {

    if(buyCurrency.name == "USDT"){
      if(activeTab){
       setBuyCurrency(currenciesByChain.TG[0])
       setSellCurrency(currenciesByChain.USDT[0])
       setBuyButtonText("SELL NOW");
      }else{
        setBuyCurrency(currenciesByChain.FIRA[0])
        setSellCurrency(currenciesByChain.USDT[0])
        setBuyButtonText("SELL NOW");
      }
    }else{

      if(activeTab){
      setBuyCurrency(currenciesByChain.USDT[0])
      setSellCurrency(currenciesByChain.TG[0])
      setBuyButtonText("BUY NOW");
      }else{
        setBuyCurrency(currenciesByChain.USDT[0])
        setSellCurrency(currenciesByChain.FIRA[0])
        setBuyButtonText("BUY NOW");
      }
    }
  }

  // use useref for buy amount input field 
  const inputRef = useRef(null);
  const updateBuyAmount = async () => {
    
    if (!inputRef.current) return;
    
    const amount = Number($("#inputbuyamount").val())
    //console.log($("#inputbuyamount").val())
       
    if (amount <= 0) return; 

    
    // Connect to the public RPC provider
    const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
    // Create a contract instance with the provider
    const contract = new ethers.Contract(tokenAddress, tokenAbi.abi, provider);
    try {
      
      let tokens = '1000000000000000000'; // Default for USDT

      setBuyAmount(amount.toString());
      if (buyCurrency.name === 'USDT') {
        
        console.log(web3.utils.toWei(amount.toString(), 'ether'))
        const usdtToToken = await contract.usdtToToken(web3.utils.toWei(amount.toString(), 'ether'));
        tokens = usdtToToken.toString(); // Convert BigInt to string
      }
      //  Why converting mwei?? USDT (Tether) has 6 decimal places (while ETH has 18 decimal places)
      if (buyCurrency.name === "TG") {
        console.log(amount)
        const tokenToUsdt = await contract.tokenToUsdt(web3.utils.toWei(amount.toString(), 'ether'));
        
        tokens = tokenToUsdt.toString();
        
      }
      
        setExpectedTokens(web3.utils.fromWei(tokens.toString(), 'ether'));  // Setting the expected tokens
   
    } catch (error) {
      console.log("unable to load resultEth", error)
    }
  }


  // fetch web3 data 
  const fetchBalance = async () => {
    // Connect to the public RPC provider
    const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
    // Create a contract instance with the provider
    const contract = new ethers.Contract(tokenAddress, tokenAbi.abi, provider);
      if (isConnected) {
          try {
            let tokenBal = await contract.balanceOf(address);
            const balance = web3.utils.fromWei(tokenBal.toString(), 'ether')
            setTokenBalance(Number(balance));
            setStackableTokenBalance(Number(balance));

          } catch (error) {
            console.log('error')
          }

      }
  }

  // buy button functionality
  async function handleBuyToken() {

    const amount = Number(inputRef.current.value);

    if (parseFloat(buyAmount) <= 0) {
      setBuyButtonText('Buy Now');
      notifyErrorMsg('Please enter amount');
      return;
    }
    const publicClient = getClient();
    const adr = window.location.href;
    const q = url.parse(adr, true);
    const qdata = q.query;
    const referral = qdata.referral || "0x0000000000000000000000000000000000000000";
   // console.log(referral)
  
    if (buyCurrency.name == 'USDT') {
      // If buy amount is more than available balance of user
      console.log(buyAmount)
      console.log(usdtBalance.toString())
      if (parseFloat(buyAmount) > parseFloat(usdtBalance.toString())) {
        notifyErrorMsg('Insufficient USDT Balance');
        return;
      }

      if(parseFloat(allowanceUSDTData.toString()) < parseFloat(buyAmount.toString())) {
        try {
          setBuyButtonText('Approving...');
    
          const hash = await  writeContractAsync({ 
            abi: tokenAbi.abi,
            address: usdtAddress,
            functionName: 'approve',
            args:[tokenAddress,parseUnits(String(buyAmount), 18)],
          })
    
          const txn = await publicClient.waitForTransactionReceipt( { hash } );
              
          if(txn.status == "success"){

            notifySuccess('Approve TXN Successful'); 
            setBuyButtonText('Buying...');

            try {
              const hash = await writeContractAsync({
                abi: tokenAbi.abi,
                address: tokenAddress,
                functionName: 'buy',
                args:[parseUnits(String(buyAmount), 18),referral],
              });
          
              const txn = await getClient().waitForTransactionReceipt({ hash });
              if (txn.status === "success") {
                notifySuccess(`${expectedTokens} Coins Bought Successfully`);
              }
      
            } catch (error) {
              console.error("Transaction failed", error);
              notifyErrorMsg(error?.shortMessage || "An unknown error occurred.");
            } finally {
              setBuyButtonText("BUY NOW");
            }
          }
        }catch(error){
          console.log(error);
          setBuyButtonText('BUY NOW');
        }
      }else{
        try {
          const hash = await writeContractAsync({
            abi: tokenAbi.abi,
            address: tokenAddress,
            functionName: 'buy',
            args:[parseUnits(String(buyAmount), 18), referral],
          });
      
          const txn = await getClient().waitForTransactionReceipt({ hash });
          if (txn.status === "success") {
            notifySuccess(`${expectedTokens} Coins Bought Successfully`);
          }
  
        } catch (error) {
          console.error("Transaction failed", error);
          notifyErrorMsg(error?.shortMessage || "An unknown error occurred.");
        } finally {
          setBuyButtonText("BUY NOW");
        }
      }

     
    } else{
        // If sell amount is more than available balance of user
        console.log(buyAmount)
        console.log(usdtBalance.toString())
        if (parseFloat(buyAmount) > parseFloat(tokenBalance.toString())) {
          notifyErrorMsg('Insufficient Coin Balance');
          return;
        }
  
        if(parseFloat(allowanceCoin.toString()) < parseFloat(buyAmount.toString())) {
          try {
            setBuyButtonText('Approving...');
      
            const hash = await  writeContractAsync({ 
              abi: tokenAbi.abi,
              address: tokenAddress,
              functionName: 'approve',
              args:[tokenAddress,parseUnits(String(buyAmount), 18)],
            })
      
            const txn = await publicClient.waitForTransactionReceipt( { hash } );
                
            if(txn.status == "success"){
  
              notifySuccess('Approve TXN Successful'); 
              setBuyButtonText('Selling...');
  
              try {
                const hash = await writeContractAsync({
                  abi: tokenAbi.abi,
                  address: tokenAddress,
                  functionName: 'sell',
                  args:[parseUnits(String(buyAmount), 18)],
                });
            
                const txn = await getClient().waitForTransactionReceipt({ hash });
                if (txn.status === "success") {
                  notifySuccess(`${buyAmount} Coins Sold Successfully`);
                }
        
              } catch (error) {
                console.error("Transaction failed", error);
                notifyErrorMsg(error?.shortMessage || "An unknown error occurred.");
              } finally {
                setBuyButtonText("SELL NOW");
              }
            }
          }catch(error){
            console.log(error);
            setBuyButtonText('SELL NOW');
          }
        }else{
          try {
            const hash = await writeContractAsync({
              abi: tokenAbi.abi,
              address: tokenAddress,
              functionName: 'buy',
              args:[parseUnits(String(buyAmount), 18), referral],
            });
        
            const txn = await getClient().waitForTransactionReceipt({ hash });
            if (txn.status === "success") {
              notifySuccess(`${expectedTokens} Coins Bought Successfully`);
            }
    
          } catch (error) {
            console.error("Transaction failed", error);
            notifyErrorMsg(error?.shortMessage || "An unknown error occurred.");
          } finally {
            setBuyButtonText("BUY NOW");
          }
        }
  
    }
    // Update user balance after purchase
    await fetchBalance();
  }
  
  // use use-effect for isConnected and more things for prevent it from running multiple times(infinite loop)
  useEffect(() => {
    if (isConnected) {
      if (balanceTokenData) {
        const balance = web3.utils.fromWei(balanceTokenData.toString(), 'ether')
        setTokenBalance(Number(balance));
      }
      if (balanceUSDTData) {
        setUSDTBalance(Number(Number(balanceUSDTData.toString()) / 1e18));
      }
      if (allowanceUSDTData) {
        setAllowanceUSDT(parseFloat(allowanceUSDTData.toString()));
      }
      if(allowanceCoinData){
        setAllowanceCoin(parseFloat(allowanceCoinData.toString()));
      }
      

      if (balanceTokenData) {
        const stackableBalance = web3.utils.fromWei(balanceTokenData.toString(), "ether");
        setStackableTokenBalance(stackableBalance);
      }
    }
  }, [isConnected, address, balanceUSDTData, allowanceUSDTData, balanceTokenData, allowanceCoinData],)

    // Add a new state for the modal
    const [showReferModal, setShowReferModal] = useState(false)
  
    const ReferEarnModal = () => {
      if (!showReferModal) return null
  
      // Only render in browser environment
      if (typeof window === "undefined") return null
  
      return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowReferModal(false)}></div>
          <ReferEarnPopup />
        </div>,
        document.body,
      )
    }


  return (
    
    <div className="h-full w-full py-[20px] sm:py-[30px] sm:w-[504px] sm:min-w-[504px] rounded-[15px] sm:rounded-[20px] bg-[#15012D0D] border border-[#842DFF]"
            style={{ backdropFilter: "blur(100px)" }} >
    <div style={{ display: activeTab? 'block': 'none'}} className="relative text-center w-full h-full">
      <div className="px-4 sm:px-[30px]">
        <h2 className="text-[24px] sm:text-[32px] leading-[29px] sm:leading-[38.4px] font-bold text-white">
          {t("home.buyNowBox.title")}
          <span className="text-[#8E00FF]">$Mine X</span> {t("home.buyNowBox.now")}
        </h2>
        <h4 className="hidden text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-medium pt-[15px]">
          {t("home.buyNowBox.untilPriceIncrease")}
        </h4>
        {/* Current & Next Price */}
        <div className="hidden mt-5">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.currentPrice")}: 
            </h2>
            <h2 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.nextPrice")}: 
            </h2>
          </div>
          <div className="my-2 sm:my-2.5 bg-[#250142] rounded-[49px] w-full h-[15px]">
            <div
              className="h-full w-[180px] rounded-[11px]"
              
            ></div>
          </div>
          <h3 className="text-[13px] sm:text-[14px] leading-[16.8px] font-normal text-[#C176FF]">
            <span className="text-white/90">{t("home.buyNowBox.raised")}:</span>

          </h3>
        </div>
      </div>

      {/* Stackable & Purchased VRN */}
      <div className="mt-5 w-full bg-[#7314C040] px-4">
        <div className="max-w-[300px] sm:max-w-[395px] mx-auto w-full flex items-center justify-between sm:gap-[85px] py-2.5">
          <div>
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-medium mb-[5px]">
            Stackable Mine X
            </h2>
            <h3 className="text-[#C176FF] text-[13px] sm:text-[14px] leading-[16.8px] font-normal">{stackableTokenBalance}</h3>
          </div>
          <div className="bg-[#842DFF] h-[40px] w-[0.5px]"></div>
          <div>
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-medium mb-[5px]">
            Purchased Mine X
            </h2>
            <h3 className="text-[#C176FF] text-[13px] sm:text-[14px] leading-[16.8px] font-normal">{tokenBalance}</h3>
          </div>
        </div>
      </div>

       {/* Tab ETH & BNB */}
       <div className="mt-5 mb-4 sm:my-5 border border-[#8616DF] rounded-md sm:rounded-[9px] p-[3.87px] sm:p-[5px] flex items-center justify-between">
            <button  disabled   style={{
              background: "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)",
            }}
              className="h-[46px] sm:h-[50px] w-full rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-2.5  border border-[#FFFFFF26]">
              <span className="text-[14px] sm:text-[16px] leading-[19.2px] font-normal">Buy Mine X</span>
            </button>
            <button onClick={() => switchTab(false)} className="h-[46px] sm:h-[50px] w-full rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-2.5"
            
            >
              <span className="text-[14px] sm:text-[16px] leading-[19.2px] font-normal">Buy FIRA</span>
            </button>
          
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
                ref={inputRef}
                onChange={updateBuyAmount}
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
                {(expectedTokens)}
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
              onClick={handleBuyToken}
          
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
           <button
              className="flex items-center gap-2 sm:gap-2.5"
              onClick={() => {

                setShowReferModal(true)
              }}
            >
              <Image src="/assets/icons/refer-earn.svg" alt="Refer Earn" width={16} height={16} />
              <h3 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">Refer & Earn</h3>
          </button>
          <Link href="#" target="_blank" className="flex items-center gap-2 sm:gap-2.5">
            <Image src="/assets/icons/how-to-buy.svg" alt="How to buy" width={16} height={16} />
            <h3 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">How to buy</h3>
          </Link>
          <Link href="#" target="_blank" className="flex items-center gap-2 sm:gap-2.5">
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
      <div className="hidden">Modal state: {showReferModal ? "open" : "closed"}</div>
      {ReferEarnModal()}
    </div>
    <div style={{ display: activeTab? 'none': 'block'}} className="relative text-center w-full h-full">
      <div className="px-4 sm:px-[30px]">
        <h2 className="text-[24px] sm:text-[32px] leading-[29px] sm:leading-[38.4px] font-bold text-white">
          {t("home.buyNowBox.title")}
          <span className="text-[#8E00FF]">$FIRA</span> {t("home.buyNowBox.now")}
        </h2>
        <h4 className="hidden text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-medium pt-[15px]">
          {t("home.buyNowBox.untilPriceIncrease")}
        </h4>
        {/* Current & Next Price */}
        <div className="hidden mt-5">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.currentPrice")}: 
            </h2>
            <h2 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.nextPrice")}: 
            </h2>
          </div>
          <div className="my-2 sm:my-2.5 bg-[#250142] rounded-[49px] w-full h-[15px]">
            <div
              className="h-full w-[180px] rounded-[11px]"
              
            ></div>
          </div>
          <h3 className="text-[13px] sm:text-[14px] leading-[16.8px] font-normal text-[#C176FF]">
            <span className="text-white/90">{t("home.buyNowBox.raised")}:</span>

          </h3>
        </div>
      </div>

      {/* Stackable & Purchased VRN */}
      <div className="mt-5 w-full bg-[#7314C040] px-4">
        <div className="max-w-[300px] sm:max-w-[395px] mx-auto w-full flex items-center justify-between sm:gap-[85px] py-2.5">
          <div>
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-medium mb-[5px]">
            Balance FIRA
            </h2>
            <h3 className="text-[#C176FF] text-[13px] sm:text-[14px] leading-[16.8px] font-normal">{stackableTokenBalance}</h3>
          </div>
          <div className="bg-[#842DFF] h-[40px] w-[0.5px]"></div>
          <div>
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-medium mb-[5px]">
            Purchased FIRA
            </h2>
            <h3 className="text-[#C176FF] text-[13px] sm:text-[14px] leading-[16.8px] font-normal">{tokenBalance}</h3>
          </div>
        </div>
      </div>

       {/* Tab ETH & BNB */}
       <div className="mt-5 mb-4 sm:my-5 border border-[#8616DF] rounded-md sm:rounded-[9px] p-[3.87px] sm:p-[5px] flex items-center justify-between">
            <button onClick={() => switchTab(true)}   className="h-[46px] sm:h-[50px] w-full rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-2.5">
              <span className="text-[14px] sm:text-[16px] leading-[19.2px] font-normal">Buy Mine X</span>
            </button>
            <button disabled className="h-[46px] sm:h-[50px] w-full rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-2.5 border border-[#FFFFFF26]"
            style={{
              background: "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)",
            }}
            >
              <span className="text-[14px] sm:text-[16px] leading-[19.2px] font-normal">Buy FIRA</span>
            </button>

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
                ref={inputRef}
                onChange={updateBuyAmount}
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
                {(expectedTokens)}
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
           <button
              className="flex items-center gap-2 sm:gap-2.5"
              onClick={() => {

                setShowReferModal(true)
              }}
            >
              <Image src="/assets/icons/refer-earn.svg" alt="Refer Earn" width={16} height={16} />
              <h3 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">Refer & Earn</h3>
          </button>
          <Link href="#" target="_blank" className="flex items-center gap-2 sm:gap-2.5">
            <Image src="/assets/icons/how-to-buy.svg" alt="How to buy" width={16} height={16} />
            <h3 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-normal">How to buy</h3>
          </Link>
          <Link href="#" target="_blank" className="flex items-center gap-2 sm:gap-2.5">
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
      <div className="hidden">Modal state: {showReferModal ? "open" : "closed"}</div>
      {ReferEarnModal()}
    </div>
    </div>
  )
}

export default BuyNowBox

