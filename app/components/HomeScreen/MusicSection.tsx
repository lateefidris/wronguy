import Image from 'next/image';
import React from 'react';
import MusicBG from '../Image/MusicBG';

const MusicSection = () => {
  return (
    <div className="bg-gradient-to-b from-lime-400 to-lime-800 flex justify-center relative">
      <h1 className="flex flex-col p-4 gap-4 text-4xl md:text-5xl text-center font-bold text-white pt-12 z-20">
        {'MUSIC'.split('').map((letter, index) => (
          <span
            key={index}
            className="hover:scale-150 transition-all duration-500 ease-out cursor-default"
          >
            {letter}
          </span>
        ))}
      </h1>
      <div className="border-8 border-lime-300 z-40 rounded-2xl flex my-8 w-full bg-black/75 backdrop-blur-2xl max-w-4xl -mb-12">
        <iframe
          src="https://open.spotify.com/embed/artist/4LkVkP0pZewHBpBsgHMr9O?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: '16px', flexGrow: 1 }}
        ></iframe>
      </div>
      <h1 className="hidden sm:flex flex-col p-4 gap-4 text-4xl md:text-5xl text-center font-bold text-neutral-200 pt-16">
        {'MUSIC'.split('').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </h1>
      <Image
        src="/images/MusicSectionGraphic.svg"
        alt="Samo"
        layout="fill"
        objectFit="cover"
        className="z-0 absolute opacity-75"
      />
    </div>
  );
};

export default MusicSection;
