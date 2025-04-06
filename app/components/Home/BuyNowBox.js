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
  ETH: [{ name: "ETH", icon: "/assets/icons/eth.svg" }],
  USDC: [{ name: "USDC", icon: "/assets/icons/usdc.svg" }],
  USDT: [{ name: "USDT", icon: "/assets/icons/usdt.svg" }],
}

const BuyNowBox = () => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState("ETH")
  const [currencies, setCurrencies] = useState(currenciesByChain.ETH)
  const [selectedCurrency, setSelectedCurrency] = useState(currenciesByChain.ETH[0])

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
  const [buyButtonText, setBuyButtonText] = useState('Buy Now')
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
  // Used for ETH, USDt, USDC buttons tabs
  useEffect(() => {
    setCurrencies(currenciesByChain[activeTab])
    setSelectedCurrency(currenciesByChain[activeTab][0])
  }, [activeTab])

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

  // used for Percent box
  const getActiveTabs = () => {
    let amountInUSD = buyAmount; // Default for USDT
    if (selectedCurrency.name === "ETH") {
      // Convert ETH to USD based on price
      amountInUSD = buyAmount * (Number(ethPriceLive) / 1e18);
    }
    if (amountInUSD < 500) return [{ bonusBelowText }];
    if (amountInUSD >= 500 && amountInUSD < 1000) return ["500"];
    if (amountInUSD >= 1000 && amountInUSD < 1500) return ["500", "1000"];
    if (amountInUSD >= 1500) return ["500", "1000", "1500"];
  };

  const activeTabs = getActiveTabs();
  useEffect(() => {
    const amount = Number(inputRef.current.value)
    let amountInUSD = buyAmount;
    if (selectedCurrency.name === "ETH") {
      amountInUSD = buyAmount * (Number(ethPriceLive) / 1e18);
    }
    if (amountInUSD < 500) {
      const remaining = 500 - amountInUSD;
      setBonusBelowText(`Add $${parseFloat(remaining).toFixed(2)} more and get 5% extra tokens!`); 
    } else if (amountInUSD == 500 && amountInUSD < 1000) {
      const remaining = 1000 - amountInUSD;
      setBonusBelowText(`Add $${parseFloat(remaining).toFixed(2)} more and get 10% extra tokens!`);
    } else if (amountInUSD == 1000 && amountInUSD < 1500) {
      const remaining = 1500 - amountInUSD;
      setBonusBelowText(`Add $${parseFloat(remaining).toFixed(2)} more and get 15% extra tokens!`);
    } else if (amountInUSD >= 1500) {
      setBonusBelowText(`congrats you get 15% extra tokens!`);
    }
  }, [buyAmount, selectedCurrency]);

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

  // use useref for buy amount input field 
  const inputRef = useRef(null);
  const updateBuyAmount = async () => {
    const currency = selectedCurrency;
    setSelectedCurrency(currency)

    if (!inputRef.current) return;
    const amount = Number(inputRef.current.value)
    if (amount <= 0) return; 
    // Connect to the public RPC provider
    const providerETH = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/4558589699cd4522b9c817c99f72ce99');
    // Create a contract instance with the provider
    const contractETH = new ethers.Contract(presaleAddress, presaleAbi.abi, providerETH);
    try {
      let currencyRateUSD = '1000000000000000000'; // Default for USDT
      if (selectedCurrency.name === 'ETH') {
        const priceBigInt = await contractETH.getLatestETHPrice();
        currencyRateUSD = priceBigInt.toString(); // Convert BigInt to string
      }
      let eth = ethers.parseUnits(amount.toString(), 'ether');
      //  Why converting mwei?? USDT (Tether) has 6 decimal places (while ETH has 18 decimal places)
      if (selectedCurrency.name === "USDT" || selectedCurrency.name === "USDC") {
        eth = Number(web3.utils.toWei(amount.toString(), 'mwei'));
      }
      const resultETH = selectedCurrency.name === "ETH"
        ? await contractETH.ethToTokens(1, BigInt(eth).toString())  // If ETH, call this function
        : selectedCurrency.name === "USDT"
          ? await contractETH.usdtToTokens(1, eth.toString())  // If USDT, call this function
          : selectedCurrency.name === "USDC"
          ? await contractETH.usdtToTokens(1, eth.toString())  // If USDC, call this function
           :await contractETH.usdtToTokens(1, eth.toString())  

      setBuyAmount(selectedCurrency.name === "ETH"
        ? Number(web3.utils.fromWei(eth.toString(), 'ether')) // Convert ETH properly
        : Number(eth) / 1e6  // USDT and USDC (adjusted for 6 decimals)
      ); 
      let tokens = Number(resultETH) / 1e18;

      // add bonus when user manually add more than 500 usdt
      if (selectedCurrency.name === "ETH") {
        // Debugging the ETH price
        console.log("ETH Price Live:", ethPriceLive);
        console.log("Buy Amount (ETH):", amount);
        
        // Calculate the amount in USD for ETH
        let amountInUSD = parseFloat(amount * (Number(ethPriceLive) / 1e18)) ;
        
        // Adjust the token multiplier based on USD value
        console.log(amountInUSD, "USD");
        if (eth < 500) {
            tokens *= 1;
        } else if (amountInUSD >= 500 && amountInUSD <= 999) {
            tokens *= 1.05;
        } else if (amountInUSD >= 1000 && amountInUSD < 1500) {
            tokens *= 1.1;  // Adjusted condition to match your logic
        } else if (amountInUSD >= 1500) {
            tokens *= 1.15;
        }
    
        console.log("Tokens for ETH:", tokens);  // Debugging the token value for ETH
        setExpectedTokens(tokens);  // Setting the expected tokens
    } else if(selectedCurrency.name === "USDT" || selectedCurrency.name === "USDC"){
        if(amount < 500) tokens *= 1;
        else if (amount >= 500 && amount <= 999) tokens *= 1.05;
        else if (amount >= 1000 && amount <= 1499) tokens *= 1.10;
        else if (amount >= 1500) tokens *= 1.15;
        console.log(tokens)
        setExpectedTokens(tokens);
      }
    } catch (error) {
      console.log("unable to load resultEth", error)
    }
  }
  const result = useBalance({ address: address });
// processTransaction function for handle buy button
async function processTransaction(abi,address,functionName, value, args ) {
    try {
      setBuyButtonText("Processing...");
      const hash = await writeContractAsync({
        abi,
        address,
        functionName,
        value,
        args,
      });

      const txn = await getClient().waitForTransactionReceipt({ hash });

      if (txn.status === "success") {
        notifySuccess(`${expectedTokens} VRN Bought Successfully`);
      }
    } catch (error) {
      console.error("Transaction failed", error);
      notifyErrorMsg(error?.shortMessage || "An unknown error occurred.");
    } finally {
      setBuyButtonText("Buy Now");
    }
  }
  // buy button functionality
  async function handleBuyToken() {
    const providerETH = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/4558589699cd4522b9c817c99f72ce99');
    // Create a contract instance with the provider
    const contractETH = new ethers.Contract(presaleAddress, presaleAbi.abi, providerETH);
    const amount = Number(inputRef.current.value)
    if (parseFloat(buyAmount) <= 0) {
      setBuyButtonText('Buy Now');
      notifyErrorMsg('Please enter amount');
      return;
    }
    const publicClient = getClient();
    const adr = window.location.href;
    const q = url.parse(adr, true);
    const qdata = q.query;
    let referral = qdata.referral || "0x0000000000000000000000000000000000000000";
  
    if (selectedCurrency.name == 'ETH') {
      // If buy amount is more than available balance of user
      if (parseFloat(buyAmount) > parseFloat(web3.utils.fromWei(ethBalance.toString(), 'ether'))) {
        notifyErrorMsg('Insufficient ETH Balance');
        return;
      }
      await processTransaction(
        presaleAddress, // address
        presaleAbi.abi, // abi
        "buyWithEth", // functionName
        parseEther(String(buyAmount)), // value
        [referral]  // args
      );
    } else {
      if (selectedCurrency.name == 'USDT') {
        //console.log(balanceUSDTData.toString());
        if (parseFloat(buyAmount) > usdtBalance) {
          setBuyButtonText('Buy Now');
          notifyErrorMsg('Insufficient USDT Balance');
          return;
        }
        if (!inputRef.current) return;
      const newAmount = buyAmount * 1000000;
      console.log(buyAmount, "buyAmount")
      console.log(newAmount, "newAmount")
      console.log(allowanceUSDT, "allowanceUDST")
        if (allowanceUSDT < parseFloat(newAmount.toString())) {
          try {
            setBuyButtonText('Approving...');
            const hash = await writeContractAsync({
              abi: tokenAbi.abi,
              address: usdtAddress,
              functionName: 'approve',
              args: [presaleAddress, parseUnits(String(buyAmount), 6)],
            })
            const txn = await publicClient.waitForTransactionReceipt({ hash });
            if (txn.status == "success") {
              notifySuccess('Approve TXN Successful');
              setBuyButtonText('Buying...');
              const hash = await writeContractAsync({
                abi: presaleAbi.abi,
                address: presaleAddress,
                functionName: 'buyWithUSDT',
                args: [newAmount, referral],
              })
              const txn2 = await publicClient.waitForTransactionReceipt({ hash });
              if (txn2.status == "success") {
                notifySuccess(`${expectedTokens} VRN Bought Successfully`);
                setBuyButtonText('Buy Now');
              }
            }
          } catch (error) {
            console.log(error);
            // 🔹 Type assertion to ensure error has 'shortMessage'
            if (error instanceof Error && "shortMessage" in error) {
              notifyErrorMsg(error.shortMessage);
            } else {
              notifyErrorMsg("An unknown error occurred.");
            }
            setBuyButtonText('Buy Now');
          }
        } else {
          try {
            setBuyButtonText('Buying...');
            const hash = await writeContractAsync({
              abi: presaleAbi.abi,
              address: presaleAddress,
              functionName: 'buyWithUSDT',
              args: [newAmount, referral],
            })
            const txn = await publicClient.waitForTransactionReceipt({ hash });
            if (txn.status == "success") {
              notifySuccess(`${expectedTokens} VRN Bought Successfully`);
              setBuyButtonText('Buy Now');
            }
          } catch (error) {
            console.log(error);
            // 🔹 Type assertion to ensure error has 'shortMessage'
            if (error instanceof Error && "shortMessage" in error) {
              notifyErrorMsg(error.shortMessage);
            } else {
              notifyErrorMsg("An unknown error occurred.");
            }
            setBuyButtonText('Buy Now');
          }

        }
      }
      if (selectedCurrency.name == 'USDC') {
        //console.log(balanceUSDCData.toString());
        if (parseFloat(buyAmount) > usdcBalance) {
          setBuyButtonText('Buy Now');
          notifyErrorMsg('Insufficient USDC Balance');
          return;
        }
        if (!inputRef.current) return;
      const newAmount = buyAmount * 1000000;
      console.log(buyAmount, "buyAmount")
      console.log(newAmount, "newAmount")
      console.log(allowanceUSDC, "allowanceUDSC")
        if (allowanceUSDC < parseFloat(newAmount.toString())) {
          try {
            setBuyButtonText('Approving...');
            const hash = await writeContractAsync({
              abi: tokenAbi.abi,
              address: usdcAddress,
              functionName: 'approve',
              args: [presaleAddress, parseUnits(String(buyAmount), 6)],
            })
            const txn = await publicClient.waitForTransactionReceipt({ hash });
            if (txn.status == "success") {
              notifySuccess('Approve TXN Successful');
              setBuyButtonText('Buying...');
              const hash = await writeContractAsync({
                abi: presaleAbi.abi,
                address: presaleAddress,
                functionName: 'buyWithUSDC',
                args: [newAmount, referral],
              })
              const txn2 = await publicClient.waitForTransactionReceipt({ hash });
              if (txn2.status == "success") {
                notifySuccess(`${expectedTokens} VRN Bought Successfully`);
                setBuyButtonText('Buy Now');
              }
            }
          } catch (error) {
            console.log(error);
            // 🔹 Type assertion to ensure error has 'shortMessage'
            if (error instanceof Error && "shortMessage" in error) {
              notifyErrorMsg(error.shortMessage);
            } else {
              notifyErrorMsg("An unknown error occurred.");
            }
            setBuyButtonText('Buy Now');
          }
        } else {
          try {
            setBuyButtonText('Buying...');
            const hash = await writeContractAsync({
              abi: presaleAbi.abi,
              address: presaleAddress,
              functionName: 'buyWithUSDC',
              args: [newAmount, referral],
            })
            const txn = await publicClient.waitForTransactionReceipt({ hash });
            if (txn.status == "success") {
              notifySuccess(`${expectedTokens} VRN Bought Successfully`);
              setBuyButtonText('Buy Now');
            }
          } catch (error) {
            console.log(error);
            // 🔹 Type assertion to ensure error has 'shortMessage'
            if (error instanceof Error && "shortMessage" in error) {
              notifyErrorMsg(error.shortMessage);
            } else {
              notifyErrorMsg("An unknown error occurred.");
            }
            setBuyButtonText('Buy Now');
          }

        }
      }
    }
    // Update user balance after purchase
    await fetchBalance();
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
      if (result['data']) {
        setETHBalance(Number(result['data'].value));
      }
      if (balanceTokenData) {
        const stackableBalance = web3.utils.fromWei(balanceTokenData.toString(), "ether");
        setStackableTokenBalance(stackableBalance);
      }
    }
  }, [isConnected, address, balanceUSDTData, totalAmountInfo, allowanceUSDTData, result, balanceTokenData],)


  

  return (
    <div className="relative text-center w-full h-full">
      <div className="px-4 sm:px-[30px]">
        <h2 className="text-[24px] sm:text-[32px] leading-[29px] sm:leading-[38.4px] font-bold text-white">
          {t("home.buyNowBox.title")}
          <span className="text-[#8E00FF]">$TG</span> {t("home.buyNowBox.now")}
        </h2>
        <h4 className="text-white/90 text-[13px] sm:text-[14px] leading-[16.8px] font-medium pt-[15px]">
          {t("home.buyNowBox.untilPriceIncrease")}
        </h4>
        {/* Current & Next Price */}
        <div className="mt-5">
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
        {/* Tab ETH & BNB */}
        <div className="mt-5 mb-4 sm:my-5 border border-[#8616DF] rounded-md sm:rounded-[9px] p-[3.87px] sm:p-[5px] flex items-center justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`h-[46px] sm:h-[50px] w-full rounded-md sm:rounded-lg flex items-center justify-center gap-2 sm:gap-2.5 ${activeTab === tab.id ? "border border-[#FFFFFF26]" : ""
                }`}
              style={
                activeTab === tab.id
                  ? {
                    background: "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)",
                  }
                  : {}
              }
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-[14px] sm:text-[16px] leading-[19.2px] font-normal">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Listing price */}
        <div className="w-full justify-center flex items-center gap-4 px-5">
          <Image src="/assets/heading-arrow.svg" alt="arrow" width={110} height={1} className="sm:w-[110px] w-[85px]" />
          <div
            className="px-2 sm:px-2.5 py-1 bg-[#9442ED80] rounded-[99px] flex items-center justify-center border border-[#9442ED80]"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <h2 className="text-nowrap text-white text-[13px] sm:text-[14px] leading-[16.8px] font-normal">
              {t("home.buyNowBox.listingPrice")}: {currentPrice}
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

        {/* Choose amount & $VRN you receive */}
        <div className="mt-4 sm:mt-5 flex items-center gap-[15px] sm:gap-5">
          {/* Choose amount */}
          <div className="flex flex-col gap-1.5 sm:gap-2 items-start w-full">
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-bold text-white">
              {t("home.buyNowBox.chooseAmount")}
            </h2>
            <div className="w-full h-[39px] sm:h-[50px] rounded-md sm:rounded-lg border border-[#8616DF] flex items-center justify-between gap-3 pl-3 sm:pl-4 pr-[3.5px] sm:pr-[5px]">
              <input
                type="text"
                ref={inputRef}
                id="inputbuyamount"
                onChange={updateBuyAmount}
                defaultValue={buyAmount}
                placeholder="0.00"
                className="w-full bg-transparent outline-none placeholder:text-white/80 text-white text-[14px] sm:text-base font-normal"
              />
              <Image
                src={selectedCurrency.icon || "/placeholder.svg"}
                alt={selectedCurrency.name}
                width={22}
                height={22}
                className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px] mr-2"
              />
            </div>
          </div>
          {/* $VRN you receive */}
          <div className="flex flex-col gap-1.5 sm:gap-2 items-start w-full">
            <h2 className="text-[13px] sm:text-[14px] leading-[16.8px] font-bold text-white">
               $TG you receive
            </h2>
            <div className="w-full h-[39px] sm:h-[50px] rounded-md sm:rounded-lg border border-[#8616DF] flex items-center justify-between px-4 gap-5">
              <span id="expectedTokens" className="text-white">
                {parseFloat(expectedTokens.toFixed(4))}
              </span>
              <Image src="/assets/icons/coin.png" alt="meta" width={50} height={50} />
            </div>
          </div>
        </div>

        {/* Available Bonus */}
        <div style={{visibility: 'hidden'}} className="my-[15px] sm:my-5 space-y-2 sm:space-y-[11px]">
          <h3 className="text-white text-[13px] sm:text-[14px] leading-[16.8px] font-bold text-left">
            {t("home.buyNowBox.availableBonus")}
          </h3>
          <div className="grid grid-cols-3 gap-[9px] sm:gap-[11px] mt-4">
            {[
              { discount: "5", amount: "500" },
              { discount: "10", amount: "1000" },
              { discount: "15", amount: "1500" },
            ].map((item) => (
              <button
                key={item.amount}
                // onClick={() => selectedBonusButton(item.amount)}
                className={`border border-[#8616DF] rounded-lg p-[5px] sm:p-2 text-[12px] sm:text-[14px] leading-[16.8px] font-medium ${activeTabs.includes(item.amount) ? "text-white" : "text-white/50"
                  }`}
                style={
                  activeTabs.includes(item.amount)
                    ? { background: "radial-gradient(42.46% 123.69% at 57.02% 58.9%, #A761FF 0%, #490A84 100%)" }
                    : {}
                }
              >
                {item.discount}%
              </button>
            ))}
          </div>

          <p onChange={updateBuyAmount} className="text-white/90 text-[12px] sm:text-[14px] font-normal leading-[16.8px] text-left">
            {bonusBelowText}
          </p>
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

