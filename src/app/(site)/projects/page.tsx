"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import Reveal from "@/components/Reveal";
import { allTags, projects } from "@/data/projects";

const PER_PAGE = 10;

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const showPagination = filtered.length > PER_PAGE;
  const paginated = showPagination ? filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE) : filtered;

  const handleTagChange = (tag: string | null) => {
    setActiveTag(tag);
    setPage(1);
  };

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Portfolio" title="Selected work" subtitle="A curated collection of projects spanning web apps, APIs, and AI-powered tools." />
        </Reveal>

        <Reveal delay={40}>
          <div className="mb-10 flex flex-wrap gap-2">
            <Tag label="All" active={!activeTag} onClick={() => handleTagChange(null)} />
            {allTags.map((tag) => (
              <Tag key={tag} label={tag} active={activeTag === tag} onClick={() => handleTagChange(tag)} />
            ))}
          </div>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2">
          {paginated.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="flex aspect-16/10 items-center justify-center overflow-hidden bg-muted/50">
                    {project.images?.[0]?.src ? (
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].alt || `${project.title} preview`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-7xl font-semibold text-muted-foreground/8">{String((page - 1) * PER_PAGE + i + 1).padStart(2, "0")}</span>
                    )}
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

        {showPagination && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
