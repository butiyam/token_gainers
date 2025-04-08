"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import styles from "../styling/StakingButton.module.css"
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
const Header = ({
  extraClass = "h-[41px]",
  paddingx = "px-[35px]",
}) => {
  // usestate for wallet connect and connected
  const { open } = useAppKit();
  const { isConnected } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  
  const [currentLang, setCurrentLang] = useState("en");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const supportedLanguages = [
      "en",
      "pt-BR",
      "ru",
      "bn",
      "de",
      "es",
      "fr",
      "hi",
      "it",
      "ja",
    ];

    const normalizeLanguage = (lang) => {
      if (lang === "pt" || lang === "br") return "pt-BR";
      return supportedLanguages.includes(lang) ? lang : "en";
    };

    const storedLang =
      localStorage.getItem("selectedLanguage") ||
      localStorage.getItem("i18nextLng");
    const langFromPath = window.location.pathname.split("/")[1];

    const finalLang = normalizeLanguage(langFromPath || storedLang);

    if (finalLang !== currentLang) {
      console.log("Header: Setting language to", finalLang);
      setCurrentLang(finalLang);
      i18n.changeLanguage(finalLang);
      localStorage.setItem("i18nextLng", finalLang);
    }
  }, [i18n]);

  const createLocalizedPath = (path) => {
    return `/${currentLang}${path}`.replace("//", "/");
  };

  const navLinks = [
    { name: t("header.nav.home"), href: "/" },
    /*{
      name: t("header.nav.features"),
      href: "#",
      submenu: [
        { name: t("header.nav.unifiedAI"), href: "/unified-ai" },
        { name: t("header.nav.depin"), href: "/de-pin" },
        { name: t("header.nav.rwa"), href: "/rwa" },
      ],
    },*/
    { name: t("header.nav.vision"), href: "/vision" },
    { name: t("header.nav.roadmap"), href: "/#roadmap" },
    { name: "Staking", href: "/staking" },
    { name: "Referrals", href: "/referrals" },
    { name: t("header.nav.whitepaper"), href: "https://tokengainers.com/assets/Whitepaper.pdf" },
    { name: t("header.nav.faqs"), href: "/#faqs" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const localizedNavLinks = navLinks.map((link) => ({
    ...link,
    href: createLocalizedPath(link.href),
    submenu: link.submenu?.map((sub) => ({
      ...sub,
      href: createLocalizedPath(sub.href),
    })),
  }));

  return (
    <div className="px-4">
      <div
        className="fixed top-0 z-40 lg:top-8 left-1/2 backdrop-blur-none md:backdrop-blur-[94.2px] -translate-x-1/2 lg:max-w-[1086px] w-full py-2.5 lg:py-2 px-4 flex justify-center bg-black md:bg-[#44067503] lg:rounded-[14px] border border-white/15 lg:border-[#9685afbd]"
        style={{
          boxShadow: "0px 0px 6px 2px #9B59FF inset",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <Link href={createLocalizedPath("/")} className="cursor-pointer">
            <Image
              src="/assets/logo.png"
              alt="TOKEN GAINERS"
              width={131}
              height={43}
            />
          </Link>

          <ul className="hidden lg:flex items-center space-x-6 text-white">
            {localizedNavLinks.map((link, idx) => (
              <NavLink
                key={idx}
                link={link}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            ))}
          </ul>

          <div className="hidden lg:flex items-center space-x-4">
         {/*   <LanguageDropdown /> */}
            {/* wallet connect button */}
            <button
              onClick={() =>
                open(isConnected ? { view: "Account" } : undefined)
              }
              className={`${styles.stakingButton} ${extraClass} ${isHovered ? styles.hovered : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
                  <div className={styles.gradientBorder} />
                  <div className={`${styles.buttonContent} ${paddingx}`}>{t(isConnected ? "header.btnConnected" : "header.btn")}</div>
                  <div className={styles.glowEffect} />
            </button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Image
              src="/assets/icons/mobile-menu.svg"
              alt="mobile-menu"
              width={50}
              height={50}
            />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <MobileMenu
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navLinks={localizedNavLinks}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          btnText={"header.btn"}
        />
      )}
    </div>
  );
};

export default Header;
