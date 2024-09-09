import { media as wixMedia } from '@wix/sdk';
import Image, { ImageProps } from 'next/image';
import { PLACEHOLDER_IMAGE } from '@app/constants';

function getImageUrlForMedia(media: string, width: number, height: number) {
  return wixMedia.getScaledToFillImageUrl(media, width, height, {});
}

export function WixMediaImage2({
  media,
  height = 320,
  width = 640,
  alt = 'no info available for image',
  className,
  sizes = '10vw',
  objectFit,
  disableZoom = false,
  itemName,
}: {
  media?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  disableZoom?: boolean;
  objectFit?: 'cover' | 'contain';
  itemName: string;
}) {
  const imageUrl = media
    ? getImageUrlForMedia(media || '', width, height)
    : PLACEHOLDER_IMAGE;

  const styleProps: Partial<ImageProps> = {
    ...(objectFit
      ? { style: { objectFit }, fill: true, sizes }
      : { width, height }),
  };

  return (
    <div className="flex items-center justify-center h-full relative group w-full">
      <div className="overflow-hidden relative w-full h-full rounded-2xl border-4 border-lime-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <Image
          {...styleProps}
          src={imageUrl}
          quality={90}
          alt={alt}
          className={`object-cover w-full ${
            !disableZoom ? 'group-hover:scale-110' : ''
          } transition duration-500 ease-in-out ${className}`}
        />
      </div>
      {itemName && (
        <div className="absolute inset-6 flex items-end justify-center z-20 text-white md:text-2xl text-xl">
          <span>{itemName}</span>
        </div>
      )}
    </div>
  );
}
