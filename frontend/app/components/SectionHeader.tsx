type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="relative z-10 mb-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div className="mx-auto mt-2 h-0.5 w-48 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full" />
      {subtitle ? (
        <p className="mt-4 text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
