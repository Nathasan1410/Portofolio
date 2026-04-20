import { projects } from '@/lib/data';
import { redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return projects.map((proj) => ({ id: proj.id }));
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    redirect('/');
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-display font-bold mb-4">{project.title}</h1>
      <p>Loading project details...</p>
    </div>
  );
}
