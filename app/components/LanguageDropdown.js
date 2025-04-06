"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "/assets/flag/au.svg" },
  { code: "pt-BR", name: "Brazilian", flag: "/assets/flag/br.png" }, // Updated from de.svg
  { code: "hi", name: "Hindi", flag: "/assets/flag/in.png" },
  { code: "ru", name: "Russian", flag: "/assets/flag/ru.png" }, // Updated from au.svg
  { code: "bn", name: "Bengali", flag: "/assets/flag/bd.png" },
  { code: "de", name: "German", flag: "/assets/flag/de.png" },
  { code: "es", name: "Spanish", flag: "/assets/flag/es.png" },
  { code: "fr", name: "French", flag: "/assets/flag/fr.png" },
  { code: "it", name: "Italian", flag: "/assets/flag/it.png" },
  { code: "ja", name: "Japanese", flag: "/assets/flag/jp.png" },
];

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]); // Default to English
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Sync language with path or localStorage on mount and pathname change
  useEffect(() => {
    const langFromPath = pathname.split("/")[1];
    const storedLang = localStorage.getItem("selectedLanguage");

    const matchedLang =
      languages.find((lang) => lang.code === langFromPath) ||
      languages.find((lang) => lang.code === storedLang) ||
      languages[0]; // Fallback to English

    setCurrentLang(matchedLang);
    i18n.changeLanguage(matchedLang.code); // Sync with i18n
  }, [pathname, i18n]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (selectedLang) => {
    if (selectedLang.code !== currentLang.code) {
      const currentPath = pathname.split("/").slice(2).join("/") || "";
      const newPath = `/${selectedLang.code}/${currentPath}`.replace("//", "/"); // Avoid double slashes
      localStorage.setItem("selectedLanguage", selectedLang.code);
      i18n.changeLanguage(selectedLang.code);
      router.push(newPath);
      setCurrentLang(selectedLang);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative block" ref={dropdownRef}>
      <button
        className="inline-flex langmenu items-center gap-2 rounded-lg py-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Select language, current: ${currentLang.name}`}
      >
        <Image
          src={currentLang.flag}
          alt={`${currentLang.name} flag`}
          width={24}
          height={24}
          loading="lazy"
          className="w-[24px] h-[24px] min-w-[24px] object-cover rounded-full"
        />
        <Image
          src="/assets/icons/arrow-down-2.svg"
          alt="Toggle dropdown"
          width={24}
          height={24}
          loading="lazy"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="w-[120px] absolute lg:top-[62px] top-[50px]  text-[#0F1017] border -left-6 backdrop-blur-3xl rounded-xl text-sm shadow-lg bg-black transition duration-100 ease-out z-[999]">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`flex w-full items-center gap-2.5 p-3 cursor-pointer ${
                currentLang.code === lang.code
                  ? "font-semibold"
                  : "hover:bg-primary rounded-xl"
              }`}
            >
              <Image
                src={lang.flag}
                alt={`${lang.name} flag`}
                width={24}
                height={24}
                loading="lazy"
                className="w-[24px] h-[24px] min-w-[24px] object-cover rounded-full"
              />
              <span
                className={`text-white/90 text-base flex-1 text-start ${
                  currentLang.code === lang.code ? "font-bold" : "font-normal"
                }`}
              >
                {lang.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
