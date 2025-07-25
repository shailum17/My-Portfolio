export default function SkillBadge({ name, category }: { name: string, category: string }) {
  const categoryColors: Record<string, string> = {
    programming: 'bg-blue-500',
    cybersecurity: 'bg-red-500',
    design: 'bg-purple-500',
    web: 'bg-green-500',
    database: 'bg-yellow-500',
    tools: 'bg-indigo-500',
  };

  return (
    <span className={`${categoryColors[category]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
      {name}
    </span>
  );
}
