"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SlArrowDown } from "react-icons/sl";

const NavLink = ({ link, dropdownOpen, setDropdownOpen }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const submenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        (!submenuRef.current || !submenuRef.current.contains(event.target))
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleSubmenuClick = (e, href) => {
    e.stopPropagation();
    router.push(href); // Use the localized href from Header
    setDropdownOpen(false);
  };

  return (
    <li className="relative group" ref={containerRef}>
      {link.submenu ? (
        <>
          <button
            onClick={handleToggleDropdown}
            className="mt-0.5 flex items-center space-x-1.5 text-[#FFFFFF]/60 hover:text-primary transition duration-300"
          >
            <span className="font-poppins text-base font-normal">
              {link.name}
            </span>
            <SlArrowDown className="text-[11px] mt-0.5" />
          </button>
          {dropdownOpen && (
            <ul
              ref={submenuRef}
              className="absolute -left-4 w-[120px] top-[50px] bg-black/90 border border-primary rounded-md shadow-lg z-[999]"
            >
              {link.submenu.map((sublink, subIndex) => (
                <li key={subIndex}>
                  <button
                    onClick={(e) => handleSubmenuClick(e, sublink.href)}
                    className="block text-center px-3 py-2 text-white/60 hover:bg-primary w-full text-base"
                  >
                    {sublink.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(link.href);
          }}
          className="font-poppins text-base font-normal text-[#FFFFFF] hover:text-primary transition duration-300"
        >
          {link.name}
        </button>
      )}
    </li>
  );
};

export default NavLink;
