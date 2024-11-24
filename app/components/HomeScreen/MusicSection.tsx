import Image from 'next/image';
import React from 'react';
import MusicBG from '../Image/MusicBG';
import { SiYoutubemusic, SiApplemusic, SiAmazon } from 'react-icons/si';
import MusicIcons from '../Icons/MusicIcons';

const MusicSection = () => {
  const iconLinks = [
    {
      icon: <SiYoutubemusic />,
      url: 'https://music.youtube.com/channel/UCIPBE57lPBfZmzoCaaIcDJw',
    },
    {
      icon: <SiApplemusic />,
      url: 'https://music.apple.com/us/artist/ewol-samo/1155076567',
    },
    {
      icon: <SiAmazon />,
      url: 'https://music.amazon.com/artists/B01M33VFXT/ewol-samo?do=play&agent=googleAssistant&ref=dmm_seo_google_gkp_artists',
    },
  ];
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
      <div className="App">
        <MusicIcons links={iconLinks} />
      </div>
      <Image
        src="/images/MusicSectionGraphic.svg"
        alt="Samo"
        fill={true}
        style={{ objectFit: 'cover' }}
        className="z-0 absolute opacity-75"
      />
    </div>
  );
};

export default MusicSection;
