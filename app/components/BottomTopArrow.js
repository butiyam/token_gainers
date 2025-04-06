'use client'
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BottomTopArrow = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className='relative'>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 bg-[#9B59FF] text-white rounded-full p-2 md:p-3 shadow-lg hover:bg-[#9B59FF] transition-all duration-300 ease-in-out"
                    aria-label="Scroll to top"
                    style={{
                        boxShadow: "0px 0px 6px 2px #9B59FF inset",
                      }}
                >
                    <ChevronUp size={24} />
                </button>
            )}
        </div>
    );
};

export default BottomTopArrow;