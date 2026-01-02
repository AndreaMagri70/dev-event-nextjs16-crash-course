import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>; // In Next.js 15+ params è una Promise
}

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
      <h1>{serializedEvent.title}</h1>
      <img src={serializedEvent.image} alt={serializedEvent.title} />
      <p>{serializedEvent.description}</p>
      {/* ... resto del tuo template ... */}
    </main>
  );
}