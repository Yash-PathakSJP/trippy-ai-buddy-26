import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.utils.toArray<HTMLElement>(".animate-fade-in").forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Hover animations for cards
      gsap.utils.toArray<HTMLElement>(".hover-card").forEach((card) => {
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Button hover effects
      gsap.utils.toArray<HTMLElement>(".hover-button").forEach((button) => {
        
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });

      // Icon rotation on hover
      gsap.utils.toArray<HTMLElement>(".hover-icon").forEach((icon) => {
        
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            rotation: 12,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
