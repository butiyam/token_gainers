"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import useLanguage from "../../hooks/useLanguage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import IntelligentAutomation from "../../components/AIUtility/IntelligentAutomation";
import AIUtilityServices from "../../components/AIUtility/AIUtilityServices";
import Timeline from "../../components/AIUtility/Timeline";
import { useTranslation } from "react-i18next";

const AIUtility = () => {
  useLanguage();
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <Header />


      <AIUtilityServices />
      <Timeline />

      <Footer />
    </I18nextProvider>
  );
};

export default AIUtility;
