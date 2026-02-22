import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Github } from "lucide-react";
import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";
import ProjectCarousel from "@/components/ProjectCarousel";
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
    <>
      <section className="section-warm py-20 sm:py-28">
        <Container>
          <Reveal>
            <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
          </Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal delay={40}>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-primary">{project.year}</p>
                <h1 className="mt-3 text-4xl leading-[1.08] font-semibold text-foreground sm:text-5xl">
                  {project.title}
                </h1>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>

              {(project.role || project.timeline) && (
                <Reveal delay={100}>
                  <dl className="mt-8 space-y-3 text-sm text-muted-foreground">
                    {project.role && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground/60">Role</dt>
                        <dd className="mt-0.5 font-medium text-foreground">{project.role}</dd>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground/60">Timeline</dt>
                        <dd className="mt-0.5 font-medium text-foreground">{project.timeline}</dd>
                      </div>
                    )}
                  </dl>
                </Reveal>
              )}
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={120}>
                {project.images && project.images.length > 0 ? (
                  <ProjectCarousel images={project.images} />
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-[20px] border border-border bg-muted/50">
                    <span className="text-6xl font-semibold text-muted-foreground/10" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      Preview
                    </span>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.longDescription}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {project.highlights && project.highlights.length > 0 && (
        <section className="section-warm py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <Reveal>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">What I Did</h2>
              </Reveal>
              <ul className="mt-6 space-y-3">
                {project.highlights.map((h, i) => (
                  <Reveal key={h} delay={i * 40}>
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <section className="section-surface py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <Reveal>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Tech Stack</h2>
              </Reveal>
              <Reveal delay={40}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <section className="section-warm py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <Reveal>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Key Challenges</h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {project.challenges.map((c, i) => (
                  <Reveal key={c.title} delay={i * 60}>
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {project.results && project.results.length > 0 && (
        <section className="section-surface py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <Reveal>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Results & Impact</h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {project.results.map((r, i) => (
                  <Reveal key={`${r.metric}-${i}`} delay={i * 60}>
                    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                      <p className="text-2xl font-semibold text-primary" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {r.metric}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="section-warm py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Explore</h2>
            </Reveal>
            <Reveal delay={40}>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
                {project.links?.caseStudy && (
                  <a
                    href={project.links.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <FileText className="h-4 w-4" /> Case Study
                  </a>
                )}
                <Link href="/contact" className="btn-hover inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm">
                  Let&apos;s talk <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
