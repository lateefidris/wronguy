import Link from 'next/link';
import React from 'react';

interface IconLink {
  icon: React.ReactNode; // Icon component
  url: string; // URL for the link
}

interface IconLinksProps {
  links: IconLink[]; // Array of IconLink objects
}

const MusicIcons: React.FC<IconLinksProps> = ({ links }) => {
  return (
    <div className="hidden sm:flex flex-col gap-6 p-4 pt-20">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-5xl font-bold text-white z-20 hover:scale-125 p-2 rounded-xl bg-neutral-700 transition-all duration-300 ease-out"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
};

export default MusicIcons;
