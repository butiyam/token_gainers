"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "../styling/StakingButton.module.css";

export default function LocalizedButtonLink({
  href = "/",
  text = "",
  translationKey = "",
  extraClass = "h-[41px]",
  paddingx = "px-[35px]",
}) {
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [currentLang, setCurrentLang] = useState("en"); // Default to English

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
      if (lang === "pt" || lang === "br") return "pt-BR"; // Map pt/br to pt-BR
      return supportedLanguages.includes(lang) ? lang : "en"; // Fallback to en
    };

    const storedLang =
      localStorage.getItem("selectedLanguage") ||
      localStorage.getItem("i18nextLng");
    const langFromPath = window.location.pathname.split("/")[1];

    const finalLang = normalizeLanguage(langFromPath || storedLang);

    if (finalLang !== currentLang) {
      console.log("LocalizedButtonLink: Setting language to", finalLang);
      setCurrentLang(finalLang);
      i18n.changeLanguage(finalLang);
      localStorage.setItem("i18nextLng", finalLang); // Sync with i18nextLng
    }
  }, [i18n]);

  const createLocalizedPath = (path) => {
    // Avoid double slashes and ensure proper path construction
    return `/${currentLang}${path}`.replace("//", "/");
  };

  const displayText = translationKey ? t(translationKey) : text;

  return (
    <Link
      href={createLocalizedPath(href)}
      className={`${styles.stakingButton} ${extraClass} ${
        isHovered ? styles.hovered : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.gradientBorder} />
      <div className={`${styles.buttonContent} ${paddingx}`}>{displayText}</div>
      <div className={styles.glowEffect} />
    </Link>
  );
}
