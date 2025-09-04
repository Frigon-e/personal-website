import { useSiteData } from "~/hooks/useSiteData";
import { Card } from "~/components/ui/card";
import SectionHeader from "~/components/SectionHeader";
import ColoredDots from "~/components/ColoredDots";
import { useInViewOnce } from "~/hooks/useInViewOnce";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "Experience - Ethan Frigon" },
  ];
}

export default function ExperiencePage() {
  const { workExperiences } = useSiteData();
  const isBrowser = typeof window !== "undefined";
  const [isSmUp, setIsSmUp] = useState(false);
  useEffect(() => {
    if (!isBrowser || typeof (window as any).matchMedia !== "function") return;
    const mq = (window as any).matchMedia("(min-width: 640px)");
    const update = () => setIsSmUp(mq.matches);
    update();
    const listener = (e: MediaQueryListEvent) => setIsSmUp(e.matches);
    if ((mq as any).addEventListener) (mq as any).addEventListener("change", listener as any);
    else (mq as any).addListener(listener as any);
    return () => {
      if ((mq as any).removeEventListener) (mq as any).removeEventListener("change", listener as any);
      else (mq as any).removeListener(listener as any);
    };
  }, [isBrowser]);
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="relative">
        <SectionHeader title="Work Experience" subtitle="Roles and timelines" />
        <ColoredDots preset="subtle" layer="behind" />
      </div>

      {/* Mobile: stacked cards */}
      {!isSmUp && (
      <div className="sm:hidden max-w-xl mx-auto space-y-4">
        {workExperiences.map((experience, index) => {
          const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });
          const base = "transition-all duration-700 ease-out";
          const hidden = index % 2 === 0 ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6";
          const visible = "opacity-100 translate-x-0";
          return (
            <div key={index} ref={ref} className={`${base} ${inView ? visible : hidden}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card className="bg-card border shadow-sm rounded-lg p-4 gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                <h3 className="font-semibold text-primary">{experience.title}</h3>
                <p className="text-muted-foreground text-sm">{experience.company}</p>
                <p className="text-muted-foreground text-xs">{experience.duration}</p>
                                {experience.location ? (
                                  <p className="text-muted-foreground text-xs">{experience.location}</p>
                                ) : null}
                {experience.summary ? (
                  <p className="mt-3 text-sm text-muted-foreground">{experience.summary}</p>
                ) : null}
                {experience.achievements?.length ? (
                  <div className="mt-3">
                    <div className="text-sm font-semibold text-foreground/90">Key Achievements:</div>
                    <ul className="mt-1 list-disc pl-5 text-muted-foreground text-sm space-y-1">
                      {experience.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {experience.technologies?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <span key={i} className="inline-flex items-center rounded-md border border-border/60 bg-muted/20 px-2 py-1 text-xs text-foreground">{tech}</span>
                    ))}
                  </div>
                ) : null}
              </Card>
            </div>
          );
        })}
      </div>
      )}

      {/* Desktop/Tablet: alternating timeline */}
      {isSmUp && (
      <div className="relative max-w-5xl mx-auto">
        <ColoredDots preset="cornerCluster" layer="front" />
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>

        {workExperiences.map((experience, index) => {
          const isLeft = index % 2 === 0;
          const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });
          const base = "transition-all duration-700 ease-out";
          const hidden = isLeft ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6";
          const visible = "opacity-100 translate-x-0";
          const delay = `${index * 120}ms`;

          return (
            <div key={index} className="relative mb-10 flex justify-center items-center">
              {/* Left Side */}
              <div className="w-1/2 flex justify-end pr-3 sm:pr-8">
                {isLeft && (
                  <div ref={ref} className={`${base} ${inView ? visible : hidden}`} style={{ transitionDelay: delay }}>
                    <Card className="bg-card border shadow-sm rounded-lg p-4 text-left w-[28rem] max-w-[90vw] gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                      <h3 className="font-semibold text-primary">{experience.title}</h3>
                      <p className="text-muted-foreground text-sm">{experience.company}</p>
                      <p className="text-muted-foreground text-xs">{experience.duration}{experience.location ? ` • ${experience.location}` : ""}</p>
                      {experience.summary ? (
                        <p className="mt-3 text-sm text-muted-foreground">{experience.summary}</p>
                      ) : null}
                      {experience.achievements?.length ? (
                        <div className="mt-3">
                          <div className="text-sm font-semibold text-foreground/90">Key Achievements:</div>
                          <ul className="mt-1 list-disc pl-5 text-muted-foreground text-sm space-y-1">
                            {experience.achievements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {experience.technologies?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {experience.technologies.map((tech, i) => (
                            <span key={i} className="inline-flex items-center rounded-md border border-border/60 bg-muted/20 px-2 py-1 text-xs text-foreground">{tech}</span>
                          ))}
                        </div>
                      ) : null}
                    </Card>
                  </div>
                )}
              </div>

              {/* Center Dot */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="65%" height="65%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 7V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2"></path>
                </svg>
              </div>

              {/* Right Side */}
              <div className="w-1/2 flex justify-start pl-3 sm:pl-8">
                {!isLeft && (
                  <div ref={ref} className={`${base} ${inView ? visible : hidden}`} style={{ transitionDelay: delay }}>
                    <Card className="bg-card border shadow-sm rounded-lg p-4 text-right w-[28rem] max-w-[90vw] gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                      <h3 className="font-semibold text-primary">{experience.title}</h3>
                      <p className="text-muted-foreground text-sm">{experience.company}</p>
                      <p className="text-muted-foreground text-xs">{experience.duration}{experience.location ? ` • ${experience.location}` : ""}</p>
                      {experience.summary ? (
                        <p className="mt-3 text-sm text-muted-foreground">{experience.summary}</p>
                      ) : null}
                      {experience.achievements?.length ? (
                        <div className="mt-3">
                          <div className="text-sm font-semibold text-foreground/90">Key Achievements:</div>
                          <ul className="mt-1 list-disc pl-5 text-muted-foreground text-sm space-y-1 text-left">
                            {experience.achievements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {experience.technologies?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {experience.technologies.map((tech, i) => (
                            <span key={i} className="inline-flex items-center rounded-md border border-border/60 bg-muted/20 px-2 py-1 text-xs text-foreground">{tech}</span>
                          ))}
                        </div>
                      ) : null}
                    </Card>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}
    </main>
  );
}
