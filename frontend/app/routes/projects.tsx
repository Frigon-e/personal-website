import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useSiteData } from "~/hooks/useSiteData";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <p className="text-muted-foreground mb-4">A selection of projects I have
        worked on.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, pIdx) => {
          const live = project.liveUrl || project.link || "";
          const github = project.githubUrl;
          return (
            <Card key={project.name} className="flex flex-col">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </CardHeader>
              <CardContent>
                {/* Photo gallery */}
                {project.photos?.length ? (
                  <div className="mb-3">
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
                            className="h-28 w-auto rounded-md border object-cover flex-shrink-0"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                <p
                  className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex gap-2">
                  {live && (
                    <Button>
                      <a href={live} target="_blank"
                         rel="noopener noreferrer">Live</a>
                    </Button>
                  )}
                  {github && (
                    <Button variant="outline">
                      <a href={github} target="_blank"
                         rel="noopener noreferrer">GitHub</a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
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
