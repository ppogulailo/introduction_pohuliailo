interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) => (
  <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
    {eyebrow && <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
    <h2 className="text-3xl leading-[1.1] font-semibold text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
    {subtitle && (
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground" style={align === "center" ? { margin: "1rem auto 0" } : {}}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
