import Image from 'next/image';
import React from 'react';

const MusicSection = () => {
  return (
    <div className="bg-lime-400 flex justify-center">
      <div className="border-8 border-lime-300 z-40 rounded-2xl flex my-8 w-full bg-black/75 backdrop-blur-2xl max-w-4xl -mb-12">
        <div className="flex flex-col p-8 gap-4 text-4xl md:text-5xl text-center font-bold text-lime-300 justify-center">
          {'MUSIC'.split('').map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
        <div className="py-8 hidden sm:flex max-w-sm items-center text-white text-lg">
          Ipsum has been the industrys standard dummy text ever since the when
          an unknown printer took a galley of type and scrambled it to make to
          make a type
        </div>
        <div className="flex items-center p-6 flex-col">
          {/* <div className="pb-2 text-white font-bold text-xl">Latest Song</div> */}
          <Image
            src="/images/Normally.jpg"
            alt=""
            width={1200}
            height={400}
            className="rounded-2xl"
          />
          <div className="pt-2 text-neutral-400">Normally</div>
        </div>
      </div>
    </div>
  );
};

export default MusicSection;
