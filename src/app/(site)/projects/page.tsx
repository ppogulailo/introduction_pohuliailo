"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import Reveal from "@/components/Reveal";
import { allTags, projects } from "@/data/projects";

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Portfolio" title="Selected work" subtitle="A curated collection of projects spanning web apps, APIs, and AI-powered tools." />
        </Reveal>

        <Reveal delay={40}>
          <div className="mb-10 flex flex-wrap gap-2">
            <Tag label="All" active={!activeTag} onClick={() => setActiveTag(null)} />
            {allTags.map((tag) => (
              <Tag key={tag} label={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)} />
            ))}
          </div>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="flex aspect-[16/10] items-center justify-center bg-muted/50">
                    <span className="text-7xl font-semibold text-muted-foreground/8">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{project.year}</p>
                      <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">View -&gt;</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
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
      </Container>
    </section>
  );
}
