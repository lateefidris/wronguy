import { products } from '@wix/stores';
import testIds from '@app/utils/test-ids';
import { WixMediaImage2 } from '@app/components/Image/WixMediaImage2';
import Link from 'next/link';
import Image from 'next/image';

export function MarketSection({ items }: { items: products.Product[] }) {
  return items.length ? (
    <div className="bg-black pt-16 pb-6 relative">
      <Image
        src="/images/MusicSectionGraphic.svg"
        alt="Samo"
        fill={true}
        style={{ objectFit: 'cover' }}
        className="z-0 absolute opacity-10"
      />
      <div className="flex justify-center items-center pb-4">
        <div className="text-white text-3xl md:text-5xl border-4 rounded-3xl justify-center p-3 uppercase z-10">
          <span className="text-lime-300 font-bold">shop</span> market
        </div>
      </div>
      <ul className="grid sm:grid-cols-3 gap-6 grid-flow-row px-8">
        {items.map((item, index) => (
          <li
            key={item._id}
            className={`relative ${
              index === 2
                ? 'bg-lime-300 flex justify-center items-center max-w-xl rounded-2xl h-auto '
                : ''
            }`}
            data-testid={testIds.PRODUCT_ITEM.CONTAINER}
          >
            {index === 2 ? (
              <div className="h-full w-full flex justify-center items-center p-4">
                <Link
                  href="/shop"
                  className="text-black inline-block text-3xl uppercase hover:scale-110 transition-all duration-500 ease-in-out"
                >
                  Show <br /> More
                </Link>
              </div>
            ) : (
              <a
                href={`/product-page/${item.slug}`}
                data-testid={testIds.PRODUCT_ITEM.PRODUCT_DETAILS_CTA}
              >
                <div className="h-auto max-w-xl relative">
                  <WixMediaImage2
                    media={item.media?.mainMedia?.image?.url}
                    height={560}
                    width={560}
                    alt={item.media?.mainMedia?.image?.altText || 'main image'}
                    className="w-full h-full object-cover"
                    itemName={item.name!}
                  />
                </div>

                {/* {!item.manageVariants && item.stock?.inStock ? (
                  <a
                    data-testid={testIds.PRODUCT_ITEM.BUY_NOW_CTA}
                    className="btn-main absolute -mt-9 left-0 cursor-pointer rounded-lg"
                    href={`/api/quick-buy/${item._id}?quantity=1`}
                  >
                    Buy Now
                  </a>
                ) : (
                  <button
                    className="btn-main absolute -mt-10 left-0 cursor-pointer"
                    disabled
                  >
                    Out of Stock
                  </button>
                )} */}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="text-3xl w-full text-center p-9 box-border max-w-4xl mx-auto">
      stay tuned for the latest drops
    </div>
  );
}
