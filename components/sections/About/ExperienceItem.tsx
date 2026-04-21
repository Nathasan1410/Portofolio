import { motion } from "framer-motion";

interface ExperienceItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
}

export function ExperienceItem({ title, company, date, description }: ExperienceItemProps) {
  return (
    <div className="group">
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {company} • {date}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  );
}
