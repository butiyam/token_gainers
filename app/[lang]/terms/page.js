"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useLanguage from "../../hooks/useLanguage";

const Terms = () => {
    useLanguage();

    return (
        <I18nextProvider i18n={i18n}>
            <Header />
            <div className=" text-white pt-[100px] md:pt-[160px] pb-[120px] max-w-[1180px] mx-auto w-full px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-10">Terms and Conditions</h1>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Introduction</h2>
                        <p className="text-gray-300">
                            You should read these Terms because they contain our legal commitments to you and a number of DOs and DON&ldquo;Ts which you need to be aware of when you use our Services. Please read these Terms carefully to make sure you understand them. By using our Services, you are automatically deemed to agree to accept and be legally bound by these Terms. For the avoidance of doubt if you do not agree with the Terms, you should not proceed to access or use our Services.
                        </p>
                        <p className="text-gray-300">
                            You should also read our <a href="/en/privacy-policy" className="text-[#a35bf5] hover:underline">Privacy Policy</a>. The Privacy Policy explains how we use your personal data.
                        </p>
                        <p className="text-gray-300">
                            If you think that there is a mistake in these terms or have any queries, please contact us to discuss.
                        </p>
                        <p className="text-gray-300">
                            If we have to contact you, we will do so by writing to you at the email address you have provided to us. It is therefore very important that you confirm you have provided a legitimate email address that is used by you personally and by proceeding with use of our Services you warrant that you have done so. We will only contact you if you have given explicit consent for us to do so. The only other time you will receive emails is where you have registered to receive our newsletter and updates.
                        </p>
                        <p className="text-gray-300">
                            When we use the words &quot;writing&quot; or &quot;written&quot; in these terms, this includes emails.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Changes to Terms</h2>
                        <p className="text-gray-300">
                            We can update and change these Terms from time to time and the most current version of these Terms will be posted on the website and relevant app. You may be invited to review and accept the revised Terms in order to continue using the Services. We suggest all users regularly check the terms on the website and in-app where any changes will be posted. You can print and save a copy of these Terms for your future reference.
                        </p>
                        <p className="text-gray-300">
                            We may require you to update software to be able to use the Services, provided that the Services will continue to match the description of it that we provided to you before.
                        </p>
                        <p className="text-gray-300">
                            The associated software may be upgraded to reflect changes in an operating system. By continuing to use the Services you will be deemed to have accepted the Terms as varied from time to time.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Using Our Service / Buying Coins</h2>
                        <p className="text-gray-300">
                            To use our service, you will need to have a virtual wallet. We draw your attention that wallets are third-party services, and we advise you to read their terms of use.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Security</h2>
                        <p className="text-gray-300">
                            Security is important to TOKEN GAINERS, and you therefore agree not to share your wallet access with any other user or third party, or knowingly carry out any activity which enables a third party to access or use your account. If we believe, acting in our discretion, that your account is used inappropriately, we reserve the right to suspend or terminate or cease to support your account without liability.
                        </p>
                        <p className="text-gray-300">
                            We cannot check the identities of people using our Services and will not be liable if your wallet connection or account is used by someone else. If you become aware of any unauthorised use of your login, you should notify us immediately by contacting us at <a href="mailto:admin@tokengainers.com" className="text-[#a35bf5] hover:underline">admin@tokengainers</a>, using &ldquo;Security Breach&ldquo; as the subject line. Please note that we may need to verify your identity and validate ownership of the account. Be alert for other websites and services which may pretend to be us or to be associated with us.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Removing Data</h2>
                        <p className="text-gray-300">
                            If you would like us to delete any data we may hold on you, please contact us by emailing <a href="mailto:admin@tokengainers.com" className="text-[#a35bf5] hover:underline">admin@tokengainers.com</a>.
                        </p>
                        <p className="text-gray-300">
                            Whereas we do not require personal or identifiable information upon signing up to use our service, we may still hold details for you if you have provided an email address to us or given us permission to contact you. If you wish for your data to be removed, you must specify this in your email. If you do not request deletion, we will hold this information as outlined in our Privacy Policy.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Rules of Use</h2>
                        <p className="text-gray-300">
                            You undertake and agree to adhere to the following rules:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li>Do not engage in personal attacks on other individuals.</li>
                            <li>Do not harass, bully, or stalk any other user of our Services.</li>
                            <li>Do not post vulgar, obscene, or sexually explicit language or images.</li>
                            <li>Do not promote or advocate illegal activities or discussions with the intent to commit them.</li>
                            <li>Do not violate the intellectual property or privacy rights of any third party.</li>
                            <li>Do not introduce viruses or other harmful components.</li>
                            <li>Do not impersonate others or misrepresent your identity.</li>
                            <li>Do not engage in spamming, trolling, or other antisocial behaviour.</li>
                            <li>Do not promote or generate money for yourself or a third party without permission.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Violation of Rules</h2>
                        <p className="text-gray-300">
                            If you believe that another user is violating these Rules, please let us know by emailing <a href="mailto:admin@tokengainers.com" className="text-[#a35bf5] hover:underline">admin@tokengainers.com</a>.
                        </p>
                        <p className="text-gray-300">
                            We cannot guarantee that other users will comply with these Rules, and we will not be responsible for any other user&ldquo;s lack of compliance. You and other users are responsible for your own actions.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Service Interruption</h2>
                        <p className="text-gray-300">
                           TOKEN GAINERS does not guarantee that the Services will always be available, uninterrupted, timely, secure, or free from bugs or viruses. There may be times when the Services are unavailable due to maintenance or technical issues. We may also change, suspend, or discontinue certain Services without giving you prior notice.
                        </p>
                        <p className="text-gray-300">
                            We will take reasonable steps to ensure that our Services are free from viruses and other malicious software, but we also recommend you use applicable antivirus software as relevant.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Prohibited Person</h2>
                        <p className="text-gray-300">
                        &quot;Prohibited Person&quot; refers to individuals or legal entities that are subject to specific sanctions under the laws of the United States, United Nations, European Union, or other relevant authorities. We will not engage in any dealings with Prohibited Persons.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Third Parties</h2>
                        <p className="text-gray-300">
                            Some pages may link to third-party websites or services. These links are provided for convenience, and TOKEN GAINERS is not responsible for any third-party content. If you visit any third-party website, please be aware that it may have its own terms of use and privacy policy.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Agreeing to Terms</h2>
                        <p className="text-gray-300">
                            By using our Services, you agree to be legally bound by these Terms. If you do not agree, you should not access or use our Services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Children</h2>
                        <p className="text-gray-300">
                            Our services are not available for use by children under the age of 18 years old or 21 years old in some jurisdictions. Please refer to your country&ldquo;s laws for age-related guidance.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Content and IP Rights</h2>
                        <p className="text-gray-300">
                            All content and information contained in the Services are owned or licensed by TOKEN GAINERS and are protected by intellectual property rights. You may not use, copy, reverse engineer, or modify any content without explicit permission.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4">Additional Important Information</h2>
                        <p className="text-gray-300">
                            You are responsible for ensuring that all persons who access our site or app through your connection comply with these terms. You must also ensure that your access and use of our Services comply with applicable laws and regulations.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li> 
                                The content on our site is for general information and is not intended as advice.
                            </li>
                            <li>
                                You should seek professional financial advice before making any financial decisions.
                            </li>
                            <li>
                                We make no guarantees regarding the accuracy, completeness, or timeliness of the content on our site.
                            </li>
                            <li>
                                You are responsible for ensuring your own virus protection when accessing our site.
                            </li>
                            <li>
                                You must not misuse our site by introducing viruses, trojans, or other malicious software.
                            </li>
                        </ul>
    
                    </div>
                </div>
            </div>
            <Footer />
        </I18nextProvider>
    );
};

export default Terms;