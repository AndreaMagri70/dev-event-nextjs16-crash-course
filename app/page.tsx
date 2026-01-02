import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import connectDB from '@/lib/mongodb'; // Funzione di connessione
import Event from '@/database/event.model'; // Modello Mongoose
import React from 'react';

const Page = async () => {
  // 1. Connessione diretta al DB
  await connectDB();
  
  // 2. Recupero dati diretto (più veloce di fetch)
  // Usiamo .lean() per trasformare il documento Mongoose in un oggetto JS semplice
  const events = await Event.find({}).lean();

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences, All in One Place</p>
      
      <ExploreBtn />

      <div className='gap-10 py-8'>
        <h3>Featured Events</h3>

        <ul className='events list-none my-6' id='events'>
          {events && events.length > 0 ? (
            events.map((event: any) => (
              <li key={event._id.toString()}>
                <EventCard {...JSON.parse(JSON.stringify(event))} />
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Page;