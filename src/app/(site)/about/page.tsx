import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const focusAreas = [
  "Responsive web applications",
  "RESTful & GraphQL APIs",
  "Performance optimization",
  "System architecture & design",
  "AI & chatbot integrations",
  "Developer experience tooling",
];

const steps = [
  { num: "01", title: "Discover", desc: "Understand the problem, goals, and constraints through conversation." },
  { num: "02", title: "Plan", desc: "Define scope, milestones, and technical approach before writing code." },
  { num: "03", title: "Build", desc: "Develop iteratively with regular check-ins and working demos." },
  { num: "04", title: "Deliver", desc: "Launch with confidence, documentation, and ongoing support." },
];

const values = [
  { title: "Quality", desc: "Every detail matters - from code readability to pixel alignment." },
  { title: "Clarity", desc: "Clear communication and simple solutions over complex ones." },
  { title: "Reliability", desc: "Delivering on time and being someone you can count on." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
            <Reveal>
              <div className="h-72 w-60 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-2xl shadow-foreground/5 sm:h-80 sm:w-64">
                <img src="/icons/Profile.png" alt="" />
              </div>
            </Reveal>
            <div className="flex-1">
              <Reveal>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">About</p>
                <h1 className="text-4xl leading-[1.1] font-semibold text-foreground sm:text-5xl lg:text-6xl">
                  Building with
                  <br />
                  purpose &amp; care
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-8 max-w-xl space-y-4">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    I&apos;m Pavlo Pohuliailo, a Senior Software Engineer based in Kyiv. With over 7 years of experience, I help teams and businesses build reliable, user-friendly digital products.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    I care deeply about clean code, thoughtful design, and creating software that genuinely serves users. I enjoy exploring tools, system design, and open-source contributions.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <div className="section-divider mx-auto max-w-[1200px]" />

      <section className="py-24 sm:py-28">
        <Container>
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="flex-1">
              <Reveal>
                <SectionHeading eyebrow="Expertise" title="My focus areas" subtitle="Areas I specialize in and enjoy working on." />
              </Reveal>
              <Reveal delay={60}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <li key={area} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {area}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="flex-1">
              <Reveal delay={100}>
                <SectionHeading eyebrow="Principles" title="Values I stand by" />
              </Reveal>
              <div className="space-y-6">
                {values.map((v, i) => (
                  <Reveal key={v.title} delay={120 + i * 60}>
                    <div className="border-l-2 border-border pl-5">
                      <h3 className="text-base font-semibold text-foreground">{v.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-warm py-24 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Process" title="How I work" subtitle="A simple, proven approach." align="center" />
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
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

      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Interested in working together?</h2>
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
