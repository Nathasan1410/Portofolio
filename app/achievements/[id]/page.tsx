import { achievements } from '@/lib/data';
import { redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return achievements.map((ach) => ({ id: ach.id }));
}

export default function AchievementDetailPage({ params }: Props) {
  const achievement = achievements.find((a) => a.id === params.id);

  if (!achievement) {
    redirect('/');
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-display font-bold mb-4">{achievement.title}</h1>
      <p>Loading achievement details...</p>
    </div>
  );
}
