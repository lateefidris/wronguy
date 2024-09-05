import React from 'react';

const LinksComponent = () => {
  // Array of link objects with href and text
  const links = [
    { href: '/about', text: 'About' },
    { href: '/shop', text: 'Merch' },
    { href: '/music', text: 'Music' },
    { href: '/events', text: 'Events' },
  ];

  return (
    <div>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="text-black hover:text-lime-500 mx-4 2xl:mx-12 lowercase font-extrabold transition-all duration-300"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
};

export default LinksComponent;
