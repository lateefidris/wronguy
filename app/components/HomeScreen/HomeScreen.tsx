import { useEffect, useState } from 'react';
import { wixEventsV2 as wixEvents } from '@wix/events';
import { products } from '@wix/stores';
import { Events } from '@app/components/Events/Events';
import HeroSection from './HeroSection';
import MusicSection from './MusicSection';
import { MarketSection } from './MarketSection';
import { getWixClient } from '@app/hooks/useWixClientServer';

// Refactored HomeScreen component
export default function HomeScreen({
  events,
}: {
  events: wixEvents.V3Event[];
}) {
  const [items, setItems] = useState<products.Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const wixClient = await getWixClient();
      try {
        const response = await wixClient.products
          .queryProducts()
          .limit(3)
          .find();
        setItems(response.items);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto relative">
      <HeroSection />
      <MusicSection />

      {/* Conditionally render the MarketSection or a loading indicator */}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <MarketSection items={items} />
      )}

      {events?.length ? (
        <div className="bg-zinc-900 text-site pt-16 sm:p-20">
          <Events events={events} />
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border max-w-4xl mx-auto">
          No events found. Click{' '}
          <a
            href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fevents%3FreferralInfo%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-purple-500"
          >
            here
          </a>{' '}
          to go to the business dashboard to add events. Once added, they will
          appear here.
        </div>
      )}
    </div>
  );
}
