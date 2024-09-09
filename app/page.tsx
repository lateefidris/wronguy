// app/page.tsx

import { getWixClient } from '@app/hooks/useWixClientServer';
import { wixEventsV2 as wixEvents } from '@wix/events';
import { products } from '@wix/stores';
import HomeScreen from '@app/components/HomeScreen/HomeScreen';

export default async function Home() {
  const wixClient = await getWixClient();

  // Fetch products directly, no need for categories
  let items: products.Product[] = [];
  try {
    items = (await wixClient.products.queryProducts().limit(3).find()).items;
  } catch (err) {
    console.error('Error fetching products:', err);
  }

  // Fetch events
  let events: wixEvents.V3Event[] = [];
  try {
    events = (
      await wixClient.wixEvents
        .queryEvents({
          fields: [wixEvents.RequestedFields.DETAILS],
        })
        .limit(10)
        .ascending('dateAndTimeSettings.startDate')
        .find()
    ).items;
  } catch (e) {
    console.error('Error fetching events:', e);
  }

  // Pass fetched data to HomeScreen as props
  return <HomeScreen events={events} products={items} />;
}
