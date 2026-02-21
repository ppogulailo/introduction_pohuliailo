import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
        </Reveal>

        <div className="max-w-3xl">
          <Reveal delay={40}>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-primary">{project.year}</p>
            <h1 className="mt-3 text-4xl leading-[1.05] font-semibold text-foreground sm:text-5xl lg:text-6xl">{project.title}</h1>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{t}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <div className="mb-12 flex aspect-[16/9] items-center justify-center rounded-2xl bg-muted/50">
                <span className="text-8xl font-semibold text-muted-foreground/8">Preview</span>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">{project.longDescription}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
