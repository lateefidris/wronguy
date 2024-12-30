import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Popup from './Popup';

const HeroSection: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Show the popup only for new users (track using localStorage)
  useEffect(() => {
    const isReturningUser = localStorage.getItem('hasSeenPopup');
    if (!isReturningUser) {
      setIsPopupOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
    localStorage.setItem('hasSeenPopup', 'true'); // Store flag in localStorage
  };

  const openPopup = () => {
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

  return (
    <div
      className="bg-gradient-to-b from-neutral-200 to-neutral-800 flex justify-center relative"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      <div className="flex flex-col pt-24">
        <div className="text-6xl md:text-8xl font-bodyRock text-lime-300">
          MrWrongGuy
        </div>
        <div className="text-right uppercase font-black text-white md:text-xl text-md">
          Ewol Samo
        </div>
      </div>

      {/* Positioned Samo Image */}
      <div className="absolute bottom-0 w-full h-[calc(100vh-96px)] z-10 transform translate-y-36 md:translate-y-36 max-w-3xl">
        <Image
          src="/images/LPage_Pic.png"
          alt="Samo"
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Footer City Skyline Image */}
      <div className="absolute bottom-0 w-full h-96 max-w-">
        <Image
          src="/images/Skyline.png"
          alt="Skyline"
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Popup component */}
      <Popup isOpen={isPopupOpen} closePopup={closePopup} />

      {/* Button to manually trigger popup */}
      {!isPopupOpen && ( // Only show the button when the popup is not open
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={openPopup}
            className=" text-white p-3 px-4 rounded-2xl hover:text-lime-400 border-2 border-gray-400 uppercase tracking-widest transition-all duration-500"
          >
            Join The Village
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
