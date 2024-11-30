import Image from 'next/image';

const HeroSection = () => {
  return (
    <div
      className="bg-gradient-to-b from-neutral-200 to-neutral-800 flex justify-center relative"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      <div className="flex flex-col pt-24">
        <div className="text-6xl md:text-8xl font-bodyRock text-lime-300">MrWrongGuy</div>
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
    </div>
  );
};

export default HeroSection;
