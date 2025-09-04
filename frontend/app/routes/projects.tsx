import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useSiteData } from "~/hooks/useSiteData";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ColoredDots from "~/components/ColoredDots";
import SectionHeader from "~/components/SectionHeader";
import { useInViewOnce } from "~/hooks/useInViewOnce";

// Create a stable slug for anchor ids
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function meta() {
  return [
    { title: "Projects - Ethan Frigon" },
  ];
}

export default function ProjectsPage() {
  const { projects } = useSiteData();

  const [isOpen, setIsOpen] = useState(false);
  const [projectIdx, setProjectIdx] = useState<number>(0);
  const [imageIdx, setImageIdx] = useState<number>(0);
  const location = useLocation();

  // Scroll to project when visiting /projects#slug or /project#slug
  useEffect(() => {
    if (typeof document === "undefined") return;
    const hash = location.hash?.replace(/^#/, "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  const openLightbox = (pIdx: number, iIdx: number) => {
    setProjectIdx(pIdx);
    setImageIdx(iIdx);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }, [isOpen, projectIdx, imageIdx]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onKeyDown]);

  const photos = projects[projectIdx]?.photos ?? [];

  const nextImage = () => {
    if (!photos.length) return;
    setImageIdx((i) => (i + 1) % photos.length);
  };
  const prevImage = () => {
    if (!photos.length) return;
    setImageIdx((i) => (i - 1 + photos.length) % photos.length);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="relative mb-6">
        <SectionHeader title="Projects" subtitle="A selection of projects I have worked on" />
        <ColoredDots preset="subtle" layer="behind" />
      </div>
      <div className="relative">
        <ColoredDots preset="cornerCluster" layer="front" />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {projects.map((project, pIdx) => {
            const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });
            const live = project.liveUrl || project.link || "";
            const github = project.githubUrl;
            return (
              <div key={project.name} id={slugify(project.name)} ref={ref} className={`scroll-mt-24 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${pIdx * 100}ms` }}>
                <Card className="group flex flex-col w-full bg-card border shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                  <CardHeader className="w-full p-0">
                    {project.photos?.[0] ? (
                      <img src={project.photos[0]} alt={`${project.name} cover`} className="w-full h-48 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    ) : null}
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 py-4">
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    {/* Photo thumbnails (keep test expectations for alt text and open button) */}
                    {project.photos?.length ? (
                      <div className="-mt-1">
                        <div className="flex gap-2 overflow-x-auto py-1">
                          {project.photos.map((src, idx) => (
                            <button
                              key={idx}
                              className="focus:outline-none"
                              onClick={() => openLightbox(pIdx, idx)}
                              aria-label={`Open ${project.name} image ${idx + 1}`}
                            >
                              <img
                                src={src}
                                alt={`${project.name} screenshot ${idx + 1}`}
                                className="h-24 w-auto rounded-md border object-cover flex-shrink-0"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    {/* Tech chips from languages and frameworks */}
                    {project.languages?.length ? (
                      <div className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                        {project.languages.flatMap((lang, li) => [
                          <span key={`${project.name}-lang-${li}`} className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/20 px-3 py-1.5 text-xs text-foreground whitespace-nowrap">{lang.name}</span>,
                          ...lang.framework.map((fw, fi) => (
                            <span key={`${project.name}-fw-${li}-${fi}`} className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/20 px-3 py-1.5 text-xs text-foreground whitespace-nowrap">{fw.name}</span>
                          )),
                        ])}
                      </div>
                    ) : null}
                    <div className="flex gap-2 pt-1">
                      {live && (
                        <Button className="transition-transform duration-150 hover:-translate-y-0.5">
                          <a href={live} target="_blank" rel="noopener noreferrer">Live</a>
                        </Button>
                      )}
                      {github && (
                        <Button variant="outline" className="transition-transform duration-150 hover:-translate-y-0.5">
                          <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <Lightbox
          srcs={photos}
          index={imageIdx}
          setIndex={setImageIdx}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          title={projects[projectIdx]?.name}
        />
      )}
    </main>
  );
}

function Lightbox({
  srcs,
  index,
  setIndex,
  onClose,
  onPrev,
  onNext,
  title,
}: {
  srcs: string[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}) {
  if (!srcs.length) return null;
  const safeIndex = Math.max(0, Math.min(index, srcs.length - 1));
  const current = srcs[safeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} images` : "Project images"}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] w-full flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between text-primary-foreground">
          <div className="text-sm opacity-80">
            {title} {srcs.length > 1 ? `(${safeIndex + 1}/${srcs.length})` : ""}
          </div>
          <button
            className="rounded-md p-2 hover:bg-white/10"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Image area with controls */}
        <div className="relative flex items-center justify-center">
          {srcs.length > 1 && (
            <button
              className="absolute left-2 md:left-4 rounded-full p-2 bg-black/40 hover:bg-black/60 text-primary-foreground"
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <img
            src={current}
            alt={title ? `${title} large view` : "Project image"}
            className="max-h-[70vh] w-auto max-w-full rounded-lg shadow-lg"
          />

          {srcs.length > 1 && (
            <button
              className="absolute right-2 md:right-4 rounded-full p-2 bg-black/40 hover:bg-black/60 text-primary-foreground"
              onClick={onNext}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {srcs.length > 1 && (
          <div className="flex gap-2 overflow-x-auto py-1">
            {srcs.map((s, i) => (
              <button
                key={i}
                className={`rounded-md border flex-shrink-0 ${i === safeIndex ? "ring-2 ring-primary" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={s}
                  alt={title ? `${title} thumb ${i + 1}` : `Image ${i + 1}`}
                  className="h-16 w-auto object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
