"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projects";

interface Props {
  images: ProjectImage[];
}

const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: ProjectImage[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIndex);
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setIdx((p) => (p + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [go, onClose]);

  useEffect(() => {
    overlayRef.current?.focus();
  }, []);

  const onTouchStartLb = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEndLb = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) go(diff < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-100 flex animate-in items-center justify-center p-2 fade-in outline-none duration-200 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-3 right-3 z-20 rounded-full bg-white/10 p-2.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:top-5 sm:right-5"
      >
        <X className="h-5 w-5" />
      </button>

      {count > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:left-5"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-5"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative z-10 flex h-full w-full max-w-[1400px] flex-col items-center rounded-lg sm:rounded-2xl"
        style={{ height: "min(94vh, 900px)" }}
        onTouchStart={onTouchStartLb}
        onTouchEnd={onTouchEndLb}
      >
        <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
          <img
            src={images[idx].src}
            alt={images[idx].alt}
            className="max-h-full max-w-full animate-in object-contain fade-in zoom-in-95 duration-200"
          />
        </div>

        <div className="mt-2 flex h-8 shrink-0 items-center gap-4">
          {images[idx].caption && (
            <span className="text-sm text-white/70">{images[idx].caption}</span>
          )}
          {count > 1 && (
            <span className="text-xs text-white/40">
              {idx + 1} / {count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCarousel = ({ images }: Props) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const count = images.length;
  const go = useCallback(
    (dir: 1 | -1) => setActive((p) => (p + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, lightboxOpen]);

  useEffect(() => {
    const el = thumbsRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
    touchStart.current = null;
  };

  if (count === 0) return null;

  return (
    <>
      <div className="w-full">
        <div
          className="relative overflow-hidden rounded-[20px] border border-border bg-card shadow-lg"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative aspect-video cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
            {images.map((img, i) => (
              <img
                key={`${img.src}-${i}`}
                src={img.src}
                alt={img.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                  i === active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              />
            ))}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label="Zoom image"
              className="absolute top-3 right-3 rounded-full bg-card/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-card"
            >
              <ZoomIn className="h-4 w-4 text-foreground" />
            </button>

            {images[active]?.caption && (
              <div className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow backdrop-blur-sm">
                {images[active].caption}
              </div>
            )}

            {count > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-card"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next image"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-card"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="absolute right-4 bottom-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow backdrop-blur-sm">
              {active + 1} / {count}
            </div>
          )}
        </div>

        {count > 1 && (
          <div
            ref={thumbsRef}
            className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-1"
          >
            {images.map((img, i) => (
              <button
                key={`${img.src}-${i}-thumb`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  i === active
                    ? "border-primary shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-16 w-24 object-cover sm:h-[72px] sm:w-28"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen &&
        createPortal(
          <Lightbox
            images={images}
            startIndex={active}
            onClose={() => setLightboxOpen(false)}
          />,
          document.body,
        )}
    </>
  );
};

export default ProjectCarousel;
