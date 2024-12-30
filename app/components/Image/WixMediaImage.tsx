import { media as wixMedia } from '@wix/sdk';
import Image, { ImageProps } from 'next/image';
import { PLACEHOLDER_IMAGE } from '@app/constants';

function getImageUrlForMedia(media: string, width: number, height: number) {
  return wixMedia.getScaledToFillImageUrl(media, width, height, {});
}

export function WixMediaImage({
  media,
  height = 320,
  width = 640,
  alt = 'no info available for image',
  className,
  sizes = '10vw',
  objectFit,
  disableZoom = false,
}: {
  media?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  disableZoom?: boolean;
  objectFit?: 'cover' | 'contain';
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
    <div className="flex items-center justify-center h-full">
      <div className="relative group w-full h-full overflow-hidden rounded-lg">
        <Image
          {...styleProps}
          src={imageUrl}
          quality={90}
          alt={alt}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}
