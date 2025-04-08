import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
import LocalizedButtonLink from "./Button";

const Footer = () => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const detectAndSetLanguage = () => {
      const storedLang =
        localStorage.getItem("selectedLanguage") ||
        localStorage.getItem("i18nextLng");

      const normalizeLanguage = (lang) => {
        const validLangs = ['en', 'es', 'fr', 'de', 'bn', 'hi', 'it', 'de', 'ja', 'pt-BR', 'ru'];
        return validLangs.includes(lang) ? lang : 'en';
      };

      const langFromPath = typeof window !== 'undefined'
        ? window.location.pathname.split("/")[1]
        : null;

      const finalLang = normalizeLanguage(langFromPath || storedLang || 'en');

      if (finalLang !== currentLang) {
        console.log("Footer: Setting language to", finalLang);
        setCurrentLang(finalLang);
        i18n.changeLanguage(finalLang);
        localStorage.setItem("i18nextLng", finalLang);
      }
    };

    if (typeof window !== 'undefined') {
      detectAndSetLanguage();
    }
  }, []);


  // newsletter
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    let timeoutId;

    if (alert.show && alert.type === 'success') {
      timeoutId = setTimeout(() => {
        setAlert({ show: false, message: '', type: '' });
      }, 5000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [alert]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    setAlert({ show: false, message: '', type: '' });

    if (!email) {
      setAlert({
        show: true,
        message: 'Please enter an email address',
        type: 'error'
      });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({
        show: true,
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setAlert({
      show: true,
      message: 'Successfully subscribed!',
      type: 'success'
    });

    setEmail('');
  };

  const createLocalizedPath = (path) => {
    return `/${currentLang}${path}`.replace("//", "/");
  };

  // Social Links
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://www.x.com/',
      icon: '/assets/icons/twitter.svg'
    },
    {
      name: 'Telegram',
      href: 'https://t.me/',
      icon: '/assets/icons/telegram.svg'
    },
    {
      name: 'MailUs',
      href: 'mailto:admin@tokengainers.com',
      icon: '/assets/icons/email.svg'
    }
  ];

  // Footer Links
  const footerLinks = [
    {
      category: 'company',
      title: t("footer.company.title"),
      links: [
        {
          name: t("footer.company.home"),
          href: "/"
        },
        {
          name: t("footer.company.roadmap"),
          href: "#roadmap"
        },
        {
          name: t("footer.company.tokenomics"),
          href: "#tokenomics"
        },
        {
          name: t("footer.company.faqs"),
          href: "#faqs"
        }
      ]
    },
    {
      category: 'resources',
      title: t("footer.resources.title"),
      links: [
        {
          name: t("footer.resources.staking"),
          href: "/staking"
        },
        {
          name: t("footer.resources.whitepaper"),
          href: "https://tokengainers.com/assets/Whitepaper.pdf"
        },
        {
          name: t("footer.resources.cookiePolicy"),
          href: "/cookie-policy"
        }
      ]
    }
  ];

  // Localize the links
  const localizedFooterLinks = footerLinks.map(category => ({
    ...category,
    links: category.links.map(link => ({
      ...link,
      href: createLocalizedPath(link.href)
    }))
  }));

  return (
    <div
      className="border-t border-solid px-[25px]"
      style={{
        borderTopWidth: "1px",
        borderImageSource:
          "linear-gradient(270deg, rgba(139, 92, 246, 0) 0%, #9E52FE 35%, #9E52FE 50%, #9E52FE 65%, rgba(139, 92, 246, 0) 100%)",
        borderImageSlice: 1,
      }}
    >
      <div className="max-w-[1162px] mx-auto w-full pt-[25px] sm:py-[60px] lg:pt-[120px] pb-[33px]">
        {/* Links */}
        <div className="pb-[50px] flex items-start justify-between lg:flex-row flex-col gap-[50px] lg:gap-5">
          <div>
            <Image src="/assets/logo.png" alt="TOKEN GAINERS" width={131} height={43} />
            <p className="max-w-[373px] pt-5 pb-8 md:pb-10 text-[14px] text-white leading-[21px] font-normal font-poppins">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-[27px]">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={40}
                    height={40}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:max-w-[528px] w-full grid grid-cols-2 sm:flex items-start justify-between gap-10 sm:gap-5">
            {localizedFooterLinks.map((category) => (
              <div
                key={category.category}
                className="w-full flex items-start justify-center flex-col"
              >
                <h2 className="mb-6 text-white text-[16px] leading-[24px] font-bold font-poppins">
                  {category.title}
                </h2>
                <ul className="space-y-[14px]">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      { link.name == 'Whitepaper' ?
                      <>
                      <Link
                        href="https://tokengainers.com/assets/Whitepaper.pdf"
                        className="text-white text-[14px] leading-[21px] font-normal font-poppins"
                      >
                        {link.name}
                      </Link>
                      </>
                      :
                      <>
                      <Link
                        href={link.href}
                        className="text-white text-[14px] leading-[21px] font-normal font-poppins"
                      >
                        {link.name}
                      </Link>
                      </>
                       }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="hidden py-10 sm:py-[50px] border-t border-[#8B5CF6]/20">
          <div className="flex items-center gap-6 sm:gap-4 justify-between flex-wrap">
            <div>
              <h2 className="text-white text-[16px] font-bold font-poppins mb-1">
                {t("footer.newsletter.title")}
              </h2>
              <h3 className="text-white text-[14px] font-poppins">
                {t("footer.newsletter.subtitle")}
              </h3>
            </div>
            <div className="sm:w-fit w-full flex flex-col">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder={t("footer.newsletter.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-white placeholder:text-white border border-[#8B5CF666] w-full sm:w-[400px] h-[45px] rounded-[12px] px-4 bg-transparent outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  className="h-[45px] w-fit border border-[#CDA4FF] rounded-xl px-6 font-medium text-[15px] text-white"
                  style={{ background: "radial-gradient(50.91% 97.54% at 50% 2.46%, #A052FF 0%, #440675 100%)", boxShadow: "0px 10px 39.3px #8400FF54" }}
                >
                  {t("footer.newsletter.subscribe")}
                </button>
              </div>

              {alert.show && (
                <div
                  className={`mt-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 ${alert.type === 'success'
                    ? 'bg-[#1C3B1A] text-[#7CFF76] border border-[#7CFF76]'
                    : 'bg-[#3B1A1A] text-[#FF7676] border border-[#FF7676]'
                    }`}
                >
                  {alert.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rights */}
        <div className="flex items-start sm:items-center justify-between md:flex-row flex-col-reverse gap-4 border-t border-[#8B5CF6]/20 pt-10 sm:pt-[50px]">
          <div className="flex items-center gap-[18px]">
            <Link
              href={createLocalizedPath("/privacy-policy")}
              className="text-white font-poppins font-normal text-[14px]"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <div className="bg-[#D9D9D9] w-1 h-1 rounded-full"></div>
            <Link
              href={createLocalizedPath("/terms")}
              className="text-white font-poppins font-normal text-[14px]"
            >
              {t("footer.termsConditions")}
            </Link>
          </div>
          <h3 className="text-white text-[14px] font-normal font-poppins">
            {t("footer.rights")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;