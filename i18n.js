"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "./public/locales/en/translation.json";
import ptTranslations from "./public/locales/pt-BR/translation.json";
import ruTranslations from "./public/locales/ru/translation.json";
import bnTranslations from "./public/locales/bn/translation.json";
import deTranslations from "./public/locales/de/translation.json";
import esTranslations from "./public/locales/es/translation.json";
import frTranslations from "./public/locales/fr/translation.json";
import hiTranslations from "./public/locales/hi/translation.json";
import itTranslations from "./public/locales/it/translation.json";
import jaTranslations from "./public/locales/ja/translation.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  "pt-BR": {
    translation: ptTranslations,
  },
  ru: {
    translation: ruTranslations,
  },
  bn: {
    translation: bnTranslations,
  },
  de: {
    translation: deTranslations,
  },
  es: {
    translation: esTranslations,
  },
  fr: {
    translation: frTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
  it: {
    translation: itTranslations,
  },
  ja: {
    translation: jaTranslations,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en", // Fallback to English for missing translations
    supportedLngs: [
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
    ],
    ns: ["translation"],
    defaultNS: "translation",
    debug: process.env.NODE_ENV !== "production",
    debug: true,
    interpolation: {
      escapeValue: false, // React handles escaping
    },

    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 1, // Language code at /en/path (index 1)
      caches: ["localStorage"], // Persist language choice
    },

    react: {
      useSuspense: false, // Avoid suspense in Next.js client components
      bindI18n: "languageChanged loaded",
    },
  });

export default i18n;
