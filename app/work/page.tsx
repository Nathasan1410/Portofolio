import { FaBriefcase } from 'react-icons/fa';

export default function WorkPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <FaBriefcase className="w-16 h-16 text-muted-foreground mb-6" />
      <h2 className="text-3xl font-display font-bold mb-2">Work Experience</h2>
      <p className="text-muted-foreground text-lg mb-4">Coming Soon</p>
      <p className="text-muted-foreground max-w-md">
        This section is reserved for professional work experience. Stay tuned!
      </p>
    </section>
  );
}
