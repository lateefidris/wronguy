import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

const LinksComponent = () => {
  // Array of link objects with href and text
  const links = [
    { href: '/shop', text: 'Merch' },
    { href: '/music', text: 'Music' },
    { href: '/shows', text: 'Shows' },
  ];

  return (
    <div>
      {links.map((link, index) => (
        // Apply the classes directly to the <Link> component
        <Link
          key={index}
          href={link.href}
          className="text-black hover:text-lime-500 mx-4 2xl:mx-12 lowercase font-extrabold transition-all duration-300"
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default LinksComponent;
