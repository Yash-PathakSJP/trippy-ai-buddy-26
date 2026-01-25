import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseGSAPMarqueeProps {
    speed?: number;
    direction?: "left" | "right";
    pauseOnHover?: boolean;
}

export const useGSAPMarquee = ({
    speed = 40,
    direction = "left",
    pauseOnHover = true
}: UseGSAPMarqueeProps = {}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const content = container.querySelector(".marquee-content") as HTMLElement;

        if (!content) return;

        // Clone content for seamless loop
        const clone = content.cloneNode(true) as HTMLElement;
        container.appendChild(clone);

        // Calculate animation duration based on speed and content width
        const contentWidth = content.offsetWidth;
        const duration = contentWidth / (speed * 10); // Adjust speed multiplier as needed

        // Set initial positions
        gsap.set(content, { x: 0 });
        gsap.set(clone, { x: direction === "left" ? contentWidth : -contentWidth });

        // Create continuous marquee animation
        const animateMarquee = () => {
            const directionMultiplier = direction === "left" ? -1 : 1;

            animationRef.current = gsap.to([content, clone], {
                x: (i) => {
                    const baseX = i === 0 ? 0 : (direction === "left" ? contentWidth : -contentWidth);
                    return baseX + (directionMultiplier * contentWidth);
                },
                duration: duration,
                ease: "none",
                repeat: -1,
                onRepeat: () => {
                    // Reset positions for seamless loop
                    gsap.set(content, { x: direction === "left" ? contentWidth : -contentWidth });
                    gsap.set(clone, { x: 0 });
                },
            });
        };

        animateMarquee();

        // Pause on hover functionality
        if (pauseOnHover) {
            const handleMouseEnter = () => {
                if (animationRef.current) {
                    animationRef.current.pause();
                }
            };

            const handleMouseLeave = () => {
                if (animationRef.current) {
                    animationRef.current.resume();
                }
            };

            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
                if (animationRef.current) {
                    animationRef.current.kill();
                }
            };
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [speed, direction, pauseOnHover]);

    return containerRef;
};
