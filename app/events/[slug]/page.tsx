import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string }>; // In Next.js 15+ params è una Promise
}

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string;} ) => (
  <div className="flex items-center gap-2">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>

)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className='agenda mt-8'>
    <h2 className="text-2xl font-bold">Agenda</h2>
    <ul className="list-disc pl-5 mt-4">
      {agendaItems.map((item, index) => (
        <li key={index} className="mb-2 text-gray-200">{item}</li>
      ))}
    </ul>
  </div>
)

export default async function EventDetailPage({ params }: Props) {
  // 1. Ottieni lo slug dai parametri
  const { slug } = await params;

  // 2. Connettiti al database
  await connectDB();

  // 3. Cerca l'evento direttamente nel DB usando lo slug
  const event = await Event.findOne({ slug }).lean();

  // 4. Se l'evento non esiste, mostra la pagina 404
  if (!event) {
    notFound();
  }

  // 5. Serializza i dati (converte ObjectId e Date in stringhe per i componenti)
  const serializedEvent = JSON.parse(JSON.stringify(event));

  return (
    <main className="container mx-auto py-10">
      <div className='header'>
        <h1>{serializedEvent.title}</h1>        
        <p className='mt-2'>{serializedEvent.description}</p>
      </div>

      <div className='details'>
        {/* Left side - Event content */}
        <div className='content'>
          <img src={serializedEvent.image} alt={serializedEvent.title} width={800} height={800} className='banner' />
          <section className='flex-col-gap-2 mt-2'>
            <h2 className='text-2xl'>Overview</h2>
            <p>{serializedEvent.overview}</p>
          </section>

          <section className='flex-col-gap-2 mt-2'>
            <h2 className='text-2xl'>Event Details</h2>
            <EventDetailItem icon='/icons/calendar.svg' alt="calendar" label={serializedEvent.date} />
            <EventDetailItem icon='/icons/clock.svg' alt="clock" label={serializedEvent.time} />
            <EventDetailItem icon='/icons/pin.svg' alt="pin" label={serializedEvent.location} />
            <EventDetailItem icon='/icons/mode.svg' alt="mode" label={serializedEvent.mode} />
            <EventDetailItem icon='/icons/audience.svg' alt="audience" label={serializedEvent.audience} />
          </section>

          <section className='flex-col-gap-2 mt-2'>

            {/* 2. RICHIAMO DEL COMPONENTE QUI */}
            {/* Passiamo l'array data.agenda alla prop agendaItems */}
            {serializedEvent.agenda && serializedEvent.agenda.length > 0 && (
              <EventAgenda agendaItems={serializedEvent.agenda} />
            )}
          </section>



        </div>

        {/* Right Side - Booking Form */}
        <aside className='booking'>
          <p className='text-lg font-semibold'>Book Event</p>
        </aside>

      </div>
    </main>
  );
}