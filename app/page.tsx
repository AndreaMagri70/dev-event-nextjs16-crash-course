import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import events from '@/lib/costants';

import React from 'react';

const Page = () => {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences, All in One Place</p>
      
      <ExploreBtn />

      <div className='gap-10 py-8'>
        <h3>Featured Events</h3>

        <ul className='events list-none my-6' id='events'>
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event } />
            </li>

          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page;