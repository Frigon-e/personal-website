import { useSiteData } from "~/hooks/useSiteData";

export function meta() {
  return [
    { title: "Experience - Ethan Frigon" },
  ];
}

export default function ExperiencePage() {
  const { workExperiences } = useSiteData();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Work Experience</h1>
      <ul className="space-y-4">
        {workExperiences.map((exp, idx) => (
          <li key={idx} className="border rounded-lg p-4 bg-card">
            <h3 className="font-semibold text-primary">{exp.title}</h3>
            <p className="text-muted-foreground text-sm">{exp.company}</p>
            <p className="text-muted-foreground text-xs">{exp.duration}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
