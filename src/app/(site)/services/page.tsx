import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const services = [
  { title: "Full-Stack Development", desc: "End-to-end web application development - from database design to polished UI.", points: ["Custom web applications", "Admin dashboards & portals", "E-commerce solutions"], outcome: "A production-ready application built with modern tools and best practices." },
  { title: "API & Integrations", desc: "Design and build RESTful or GraphQL APIs, third-party integrations, and data pipelines.", points: ["API architecture & design", "Third-party service integration", "Data pipeline development"], outcome: "Reliable, well-documented APIs that connect your systems seamlessly." },
  { title: "AI & Chatbot Integration", desc: "Add intelligent features - chatbots, content generation, recommendations - to your product.", points: ["LLM-powered features", "Conversational interfaces", "Smart automation workflows"], outcome: "Smarter products that save time and delight users." },
  { title: "Architecture Review", desc: "Audit your existing codebase, identify bottlenecks, and recommend improvements.", points: ["Code quality assessment", "Performance optimization", "Scalability planning"], outcome: "A clear roadmap for better performance, scalability, and maintainability." },
];

const timeline = [
  { phase: "Discovery call", duration: "30 min", desc: "Free introductory conversation" },
  { phase: "Proposal & scope", duration: "2-3 days", desc: "Detailed project breakdown" },
  { phase: "Development", duration: "Varies", desc: "Iterative build with check-ins" },
  { phase: "Review & launch", duration: "1 week", desc: "QA, deployment, handoff" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Services" title="How I can help" subtitle="Focused expertise across the full product lifecycle - from concept to production." />
          </Reveal>
          <div className="space-y-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="card-hover rounded-2xl border border-border bg-card p-8 sm:p-10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                    <div className="shrink-0 lg:w-72">
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">What you get</p>
                      <ul className="space-y-2">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs italic text-muted-foreground/70">{s.outcome}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="section-divider mx-auto max-w-[1200px]" />

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Timeline" title="Typical process" subtitle="What to expect when we work together." align="center" />
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.phase} delay={i * 60}>
                <div className="text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{t.phase}</h3>
                  <p className="mt-1 text-xs font-medium text-primary">{t.duration}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-warm py-24 sm:py-28">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Ready to start?</h2>
              <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">Book a free discovery call to discuss your project and explore how we can collaborate.</p>
              <div className="mt-8">
                <Link href="/contact" className="btn-hover inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background">
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
