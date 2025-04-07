"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useLanguage from "../../hooks/useLanguage";

const CookiePolicy = () => {
  useLanguage();

  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <div className="pt-[100px] md:pt-[160px] pb-[120px] max-w-[1180px] mx-auto w-full px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Cookie Policy</h1>
        
        <div className="space-y-8 text-gray-300">
          <p>
            For the purposes of this Cookie Policy, &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to &quot;TOKEN GAINERS&quot;.
          </p>
          
          <p>
            This Cookie Policy applies to the following &quot;Services&quot;: TOKENGAINERS.com and any other dedicated websites, apps, products, forums, and services we offer through the app or Website or other dedicated website which may be offered by us from time to time, or otherwise provided by us.
          </p>
          
          <p>
            You can change your Cookie preferences or withdraw consent at any time using the Privacy Settings.
          </p>
          
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">1. What is a cookie?</h2>
            <p>
              Cookies are text files containing small amounts of information which are placed onto your device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the website as to generally improve the user experience, for example, by remembering your preferences, or by offering you personalized content and advertisements.
            </p>
            <p className="mt-4">
              Functions usually performed by a cookie can also be achieved by other similar technologies, such as log files, pixel tags, web beacons, clear GIFs, and device IDs. In this Cookie Policy, we will be referring to them collectively as &quot;Cookies&quot;.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How do we use Cookies?</h2>
            <p>We may use Cookies to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Verify log-in information and allow users to find friends who use a Service;</li>
              <li>Track traffic flow and patterns of travel in connection with a Service;</li>
              <li>Understand the total number of users of a Service on an ongoing basis and the types of devices;</li>
              <li>Monitor the performance of a Service to continually improve it;</li>
              <li>Customize and enhance your online experience;</li>
              <li>Provide customer service to you; and</li>
              <li>Serve third parties adverts within our services.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. What types of cookies do we use?</h2>
            <p>
              The types of Cookies used by us and our partners in connection with a Service can be classified into these categories: &quot;Necessary Cookies&quot;, &quot;Functionality Cookies&quot;, &quot;Analytics Cookies&quot;, and &quot;Advertising and Tracking Cookies&quot;. We have set out below some further information about each category, purpose, and duration of the Cookies we and third parties set. You may disable Cookies at any time by using the Privacy Settings, but this may affect how the Service functions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 border border-[#6e33bd] rounded-lg bg-[#11001e]/40">
                <h3 className="text-xl font-medium mb-2">Necessary Cookies</h3>
                <p>Enable core functionality such as security, network management, and accessibility.</p>
              </div>
              
              <div className="p-6 border border-[#6e33bd] rounded-lg bg-[#11001e]/40">
                <h3 className="text-xl font-medium mb-2">Functionality Cookies</h3>
                <p>Record information about choices you have made and allow us to tailor a Service to you.</p>
              </div>
              
              <div className="p-6 border border-[#6e33bd] rounded-lg bg-[#11001e]/40">
                <h3 className="text-xl font-medium mb-2">Analytics Cookies</h3>
                <p>Analyze how our Service is accessed, used, or is performing in order to provide you with a better user experience and to maintain, operate, and continually improve a Service.</p>
              </div>
              
              <div className="p-6 border border-[#6e33bd] rounded-lg bg-[#11001e]/40">
                <h3 className="text-xl font-medium mb-2">Advertising and Targeting Cookies</h3>
                <p>May be set through our Services by our advertising partners to show you relevant adverts on other sites.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. How to control or delete cookies</h2>
            <p>
              You have the right to control our use of cookies and other similar technologies at any time by using the Privacy Settings or adjusting the in-app settings. However, please note that if you choose to refuse Cookies, you may not be able to use the full functionality of the Services.
            </p>
            <p className="mt-4">
              In addition to the above, most browsers allow you to change your preferences for Cookies through their settings. These settings are typically found in the &quot;options&quot; or &quot;preferences&quot; menu. In order to understand these settings, the following links may be helpful:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647?hl=en" className="text-[#a35bf5] hover:underline">Cookie setting in Chrome</a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-[#a35bf5] hover:underline">Cookie setting in Safari</a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-[#a35bf5] hover:underline">Cookie setting in Firefox</a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-[#a35bf5] hover:underline">Cookie setting in Internet Explorer</a>
              </li>
            </ul>
            <p className="mt-4">
              To opt out of being tracked by Google Analytics across all websites, visit the link below:
            </p>
            <p className="mt-2">
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#a35bf5] hover:underline">Google Analytics Opt-Out</a>
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Changes to this Cookie Policy</h2>
            <p>
              We will update this Cookie Policy to reflect changes in our practices and services. When we post changes to this Cookie Policy, we will revise the &quot;Last Updated&quot; date at the top of this Cookie Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Need More Information?</h2>
            <p>
              If you would like to find out more about cookies and their use on the Internet, you may find further useful information on 
              <a href="https://www.aboutcookies.org/" className="text-[#a35bf5] hover:underline ml-1">AboutCookies</a>, 
              <a href="https://www.allaboutcookies.org/" className="text-[#a35bf5] hover:underline ml-1">All About Cookies</a>, and 
              <a href="https://www.youronlinechoices.com/" className="text-[#a35bf5] hover:underline ml-1">Your Online Choices</a>.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies that have been set in the past</h2>
            <p>
              If you have disabled one or more Cookies, we may still use information collected from cookies prior to your disabled preference being set, however, we will stop using the disabled cookie to collect any further information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact us</h2>
            <p>
              If you wish to contact us about this Cookies Policy and the use of cookies in the Services, please contact us at: 
              <a href="mailto:admin@tokengainers.com" className="text-[#a35bf5] hover:underline ml-1">admin@tokengainers.com</a>.
            </p>
          </section>
          
          
        </div>
      </div>
      <Footer />
    </I18nextProvider>
  );
};

export default CookiePolicy;