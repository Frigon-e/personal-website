import { useEffect, useRef, useState } from "react";

// A utility to deep-compare the options object for the dependency array
function useDeepCompareMemoize(value: IntersectionObserverInit) {
  const ref = useRef<IntersectionObserverInit>();

  if (JSON.stringify(value) !== JSON.stringify(ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useInViewOnce<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  // Memoize the options object to prevent the effect from re-running unnecessarily
  const memoizedOptions = useDeepCompareMemoize(options);

  useEffect(() => {
    // We only want to run this logic once inView is false
    if (inView) return;

    // Ensure the ref is attached to an element
    const element = ref.current;
    if (!element) return;

    // Handle SSR and older browsers
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting, update state and disconnect
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, memoizedOptions); // Use the memoized options

    observer.observe(element);

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, [memoizedOptions, inView]); // Depend on memoizedOptions and inView

  return { ref, inView } as const;
}
