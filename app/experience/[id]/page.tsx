import { experiences } from '@/lib/data';
import { redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return experiences.map((exp) => ({ id: exp.id }));
}

export default function ExperienceDetailPage({ params }: Props) {
  const experience = experiences.find((e) => e.id === params.id);

  if (!experience) {
    redirect('/');
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-display font-bold mb-4">{experience.title}</h1>
      <p>Loading experience details...</p>
    </div>
  );
}
