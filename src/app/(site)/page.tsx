import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

const metrics = [
  { value: "7+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

const services = [
  { num: "01", title: "Full-Stack Development", desc: "End-to-end web applications built with modern frameworks, optimized for performance and scalability.", points: ["React & TypeScript", "Node.js & PostgreSQL", "Cloud deployment"] },
  { num: "02", title: "API & Integrations", desc: "Seamless connections between your systems with clean, well-documented APIs.", points: ["REST & GraphQL", "Third-party integrations", "Data pipelines"] },
  { num: "03", title: "AI Solutions", desc: "Intelligent features that add genuine value - chatbots, recommendations, and content generation.", points: ["LLM integration", "Custom AI workflows", "Smart automation"] },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "Understanding your goals, constraints, and vision through deep conversation." },
  { num: "02", title: "Plan", desc: "Defining scope, architecture, and milestones with clarity." },
  { num: "03", title: "Build", desc: "Iterative development with regular check-ins and working demos." },
  { num: "04", title: "Deliver", desc: "Launch with confidence, documentation, and ongoing support." },
];

const featuredProjects = projects.slice(0, 3);

export default function IndexPage() {
  return (
    <>
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="hero-haze -top-20 -right-40 h-80 w-80 bg-primary/20" />
        <div className="hero-haze top-40 -left-32 h-64 w-64 bg-accent/40" />

        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-primary">Senior Software Engineer - Kyiv</p>
              </Reveal>
              <Reveal delay={60}>
                <h1 className="text-5xl leading-[1.05] font-semibold text-foreground sm:text-6xl lg:text-7xl">
                  Crafting digital
                  <br />
                  experiences with
                  <br />
                  <span className="text-primary">intention</span>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
                  I design and build thoughtful digital products - focused on clarity, performance, and good craft. Let&apos;s create something meaningful together.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-hover inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background">
                    Let&apos;s talk <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/projects" className="btn-hover inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground">
                    View work
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={200}>
                <div className="relative w-full">
                  <div className="aspect-video overflow-hidden rounded-[20px] border border-border/60 shadow-2xl shadow-foreground/5">
                  <iframe
                    src="https://www.youtube.com/embed/e9pvT5_ZZ3M"
                    title="Introduction video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  </div>
                  <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-primary shadow-sm">
                    Open to work
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <div className="section-divider mx-auto max-w-[1200px]" />

      <section className="py-20 sm:py-24 section-warm">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-3xl font-semibold text-foreground sm:text-4xl">{m.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="section-divider mx-auto max-w-[1200px]" />

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Selected Work" title="Projects that define quality" subtitle="A curated selection of recent projects showcasing end-to-end execution." />
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="flex aspect-4/3 items-center justify-center bg-muted/50">
                      <span className="text-6xl font-semibold text-muted-foreground/10">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-muted-foreground">{project.year}</p>
                      <h3 className="mt-1 text-xl font-semibold text-foreground">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-12 text-center">
              <Link href="/projects" className="link-underline text-sm font-medium text-foreground">View all projects</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-warm py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Services" title="What I bring to the table" subtitle="Focused expertise across the full product lifecycle." />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card-hover rounded-2xl border border-border bg-card p-8">
                  <span className="text-xs font-semibold text-primary">{s.num}</span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Process" title="How we get there" subtitle="A proven approach that delivers consistent results." align="center" />
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 60}>
                <div className="text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-semibold text-primary">{step.num}</span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="section-divider mx-auto max-w-[1200px]" />

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">Ready?</p>
              <h2 className="text-4xl leading-[1.05] font-semibold text-foreground sm:text-5xl lg:text-6xl">Let&apos;s work together</h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Have a project in mind? I&apos;d love to hear about it. Let&apos;s explore how we can create something exceptional.
              </p>
              <div className="mt-10">
                <Link href="/contact" className="btn-hover inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
