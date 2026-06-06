export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow mb-4">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black leading-[1.35] tracking-tight md:text-5xl">{title}</h2>
      <p className="muted mt-5 text-[15px] leading-8">{description}</p>
    </div>
  );
}
