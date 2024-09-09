// components/HomeScreen.tsx
'use client';

import { useState, useEffect } from 'react';
import { products } from '@wix/stores';
import { Events } from '@app/components/Events/Events';
import HeroSection from './HeroSection';
import MusicSection from './MusicSection';
import { MarketSection } from './MarketSection';
import { wixEventsV2 as wixEvents } from '@wix/events';

export default function HomeScreen({
  events,
  products,
}: {
  events: wixEvents.V3Event[];
  products: products.Product[];
}) {
  const [items, setItems] = useState<products.Product[]>(products);
  const [loading, setLoading] = useState(false); // Set loading to false since products are already fetched

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
