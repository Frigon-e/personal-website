export function meta() {
  return [
    { title: "Education - Ethan Frigon" },
  ];
}

export default function EducationPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Education</h1>
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-card">
          <h3 className="font-semibold">B.S. in Computer Science</h3>
          <p className="text-muted-foreground text-sm">Your University</p>
          <p className="text-muted-foreground text-xs">2017 - 2021</p>
        </div>
      </div>
    </main>
  );
}
