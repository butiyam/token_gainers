"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";
import LanguageDropdown from "./LanguageDropdown";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import styles from "../styling/StakingButton.module.css"
import { useTranslation } from "react-i18next";
const MobileMenu = ({
  mobileOpen,
  setMobileOpen,
  navLinks,
  dropdownOpen,
  setDropdownOpen,
  extraClass = "h-[41px]",
  paddingx = "px-[35px]"
}) => {
  const router = useRouter();
  const { open } = useAppKit();
  const { isConnected } = useAccount();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  
  return (
    <div className="lg:hidden min-w-full fixed min-h-screen top-0 z-50 left-0 w-full bg-black p-6">
      <button
        className="lg:hidden flex items-end justify-end w-full text-white sticky z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes size={24} /> : null}
      </button>
      <ul className="text-white space-y-4">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            link={link}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        ))}
      </ul>

      <div className="mt-4 space-y-4">
     {/*   <LanguageDropdown /> */}
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
    </div>
  );
};

export default MobileMenu;
