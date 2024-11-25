import { Events } from '@app/components/Events/Events';
import { wixEventsV2 as wixEvents } from '@wix/events';
import { getWixClient } from '@app/hooks/useWixClientServer';

// The Shows component will now accept events as a prop
export default async function Shows() {
  let events: wixEvents.V3Event[] = [];

  try {
    // Fetching events data from the Wix API
    const wixClient = await getWixClient(); // Initialize your wixClient here
    events = (
      await wixClient.wixEvents
        .queryEvents({
          fields: [wixEvents.RequestedFields.DETAILS],
        })
        .limit(10) // Limit the number of events
        .ascending('dateAndTimeSettings.startDate') // Sort events by start date
        .find()
    ).items;
  } catch (e) {
    console.error('Error fetching events:', e);
  }

  // Return the Shows component with the fetched events passed as props
  return (
    <div className="mx-auto relative">
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
