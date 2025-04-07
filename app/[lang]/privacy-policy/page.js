"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useLanguage from "../../hooks/useLanguage";

const PrivacyPolicy = () => {
    useLanguage();

    return (
        <I18nextProvider i18n={i18n}>
            <Header />
            <div className=" text-white pt-[100px] md:pt-[160px] pb-[120px] max-w-[1180px] mx-auto w-full px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-10">Privacy Policy</h1>

                <div className="space-y-6">
                    <p className="text-gray-300">
                        This privacy policy (&quot;Policy&quot;) informs you of your choices and our practices in relation to your Information (as defined below).
                        For the purposes of this Policy, &quot;we&quot;, &quot;us&quot;, and &quot;our&quot; refer to &quot;TOKEN GAINERS&quot;.
                    </p>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Children</h2>
                        <p className="text-gray-300">
                            Our services are not available for use by children and are intended for persons over the age of 18 years old, and 21 years old in some jurisdictions.
                            Please refer to your country laws for age-appropriate guidance.
                        </p>
                        <p className="text-gray-300">
                            To comply with the current &quot;UK Data Protection Act&quot; for Children, specifically the Age Appropriate Design Code (also known as the Children&ldquo;s Act),
                            risks have been assessed. More information can be found at ICO Children&ldquo;s Code Hub.
                        </p>
                        <p className="text-gray-300">
                            This policy will explain areas of our app or website that may affect your privacy and personal details, how we process, collect,
                            manage and store those details, and your rights in relation to your data.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Personal Information We Collect</h2>
                        <p className="text-gray-300">We may collect and use the following Information about you:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>Information you provide to us, such as your name, mailing address, phone number, email address, and payment information.</li>
                            <li>Information you provide via customer support channels, such as when contacting us via email.</li>
                            <li>Information collected when you use our app or website, including cookies and location-based data.</li>
                            <li>Information from third parties, including social media and analytics services like Google Analytics.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">How We Use Your Personal Information</h2>
                        <p className="text-gray-300">We will only use your personal data when the law allows us to. Common reasons include:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>To provide you with our service, including access to our app via a virtual wallet.</li>
                            <li>To improve and monitor the use of our services.</li>
                            <li>To provide customer support and respond to your queries or complaints.</li>
                            <li>To prevent fraud, defend legal claims, and comply with legal obligations.</li>
                            <li>To conduct analytics and provide targeted advertising (with your consent).</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Your Choices About How Information is Used</h2>
                        <p className="text-gray-300">You have the following choices regarding how we use your information:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>Marketing Emails: You can opt-out of receiving promotional emails by using the &quot;unsubscribe&quot; feature in our marketing emails.</li>
                            <li>Financial Incentives: We may run promotions that ask you to share personal information. Participation is voluntary.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Who We Share Your Personal Information With</h2>
                        <p className="text-gray-300">We may share your information with the following entities:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>Vendors and service providers (e.g., cloud services like AWS).</li>
                            <li>Analytics providers (e.g., Google, Apple, AWS).</li>
                            <li>Advertising partners (for ad-supported services).</li>
                            <li>Law enforcement agencies or public authorities if required by law.</li>
                            <li>Entities involved in mergers, acquisitions, or corporate reorganizations.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Security</h2>
                        <p className="text-gray-300">
                            We have security measures in place to protect your information, but transmission over the internet is not completely secure.
                            We recommend using appropriate security measures when using our services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Where We Process Your Information</h2>
                        <p className="text-gray-300">
                            Your information will be processed by our employees and service providers (Apple, Google, AWS, Mailchimp).
                            If necessary, we ensure that your data is transferred to countries that provide adequate protection for personal data.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">How Long We Store Your Information</h2>
                        <p className="text-gray-300">
                            We store your information for up to 6 years. When deleting information, we take measures to make it irrecoverable or irreproducible.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Your Rights</h2>
                        <p className="text-gray-300">You have the following rights under data protection laws:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>The right to request access to your personal data.</li>
                            <li>The right to request correction of your personal data.</li>
                            <li>The right to request erasure of your personal data.</li>
                            <li>The right to object to processing of your personal data.</li>
                            <li>The right to request restriction of processing of your personal data.</li>
                            <li>The right to request transfer of your personal data.</li>
                            <li>The right to withdraw consent at any time.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">California Privacy Rights (Addendum 1)</h2>
                        <p className="text-gray-300">
                            The terms of this addendum apply to residents of California under the California Consumer Privacy Act (CCPA).
                            For the purposes of this addendum, Personal Information means information that identifies or is linked to a particular consumer or household.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Brazil Privacy Rights (Addendum 2)</h2>
                        <p className="text-gray-300">
                            The terms of this addendum apply to residents of Brazil under the Lei Geral de Proteção de Dados (LGPD).
                            You have the right to ask whether we hold your personal information and request its deletion, restriction, or correction.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Contact & Complaints</h2>
                        <p className="text-gray-300">
                            If you have any questions or complaints regarding this policy, please contact us at <a href="mailto:admin@tokengainers.com" className="text-[#a35bf5] hover:underline">admin@tokengainers.com</a>.
                        </p>
                        <p className="text-gray-300">
                            If you wish to make a complaint about how we process your information, we will aim to respond within 30 days.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Changes to this Policy</h2>
                        <p className="text-gray-300">
                            Any updates or changes to this policy will be published here.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </I18nextProvider>
    );
};

export default PrivacyPolicy;