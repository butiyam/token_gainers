"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const pathname = usePathname();

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
      // Map pt or br to pt-BR, otherwise check if lang is supported
      if (lang === "pt" || lang === "br") return "pt-BR";
      return supportedLanguages.includes(lang) ? lang : "en";
    };

    const initializeLanguage = async () => {
      try {
        const pathLang = 'en';//pathname.split("/")[1];
        //console.log(pathLang)
        const storedLang =
          localStorage.getItem("selectedLanguage") ||
          localStorage.getItem("i18nextLng");
        const normalizedLang = normalizeLanguage(pathLang);

        // Only change language if different and i18n is ready
        if (i18n.language !== normalizedLang && i18n.isInitialized) {
         // console.log("useLanguage: Changing to", normalizedLang);
          await i18n.changeLanguage(normalizedLang);
          localStorage.setItem("i18nextLng", normalizedLang); // Sync i18nextLng
        }
      } catch (error) {
        console.error("Language initialization error:", error);
      }
    };

    initializeLanguage();
  }, [i18n, pathname]);
};

export default useLanguage;
