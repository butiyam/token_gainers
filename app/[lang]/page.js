"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import Header from "../components/Header";
import useLanguage from "../hooks/useLanguage";
import FeaturedIn from "../components/Home/FeaturedIn";
import OurFeature from "../components/Home/OurFeatures";
import BuiltOn from "../components/Home/BuiltOn";
import BuyNRTX from "../components/Home/BuyNRTX";
import EarnRewards from "../components/Home/EarnRewards";
import RewardsCalculator from "../components/Home/RewardsCalculator";
import RoadMap from "../components/Home/RoadMap";
import Tokenomics from "../components/Home/Tokenomics";
import FAQ from "../components/Home/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";

const Home = () => {
  useLanguage();

  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <div className="relative w-full">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="/assets/hero-section-bg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay + Content Container */}
        <div className="relative w-full z-10">
          <div className="relative max-w-[1296px] mx-auto px-4 sm:px-6 pt-[130px] lg:pt-[185px] pb-[50px] sm:pb-16">
            <Hero />
          </div>
        </div>
      </div>
      <FeaturedIn />
      <OurFeature />
      <BuyNRTX />
      <EarnRewards />
      <RewardsCalculator />
      <RoadMap />
      <Tokenomics />
      <BuiltOn />
      <FAQ />
      <Footer />
    </I18nextProvider>
  );
};

export default Home;
