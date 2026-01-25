import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface UseGSAPCounterProps {
    end: number;
    duration?: number;
    delay?: number;
}

export const useGSAPCounter = ({ end, duration = 2000, delay = 0 }: UseGSAPCounterProps) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<{ tween: gsap.core.Tween | null }>({ tween: null });

    useEffect(() => {
        if (!elementRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !counterRef.current.tween) {
                        // Kill any existing tween
                        if (counterRef.current.tween) {
                            counterRef.current.tween.kill();
                        }

                        // Create new counter animation
                        counterRef.current.tween = gsap.to(
                            { value: 0 },
                            {
                                value: end,
                                duration: duration / 1000,
                                delay: delay / 1000,
                                ease: "power2.out",
                                onUpdate: function () {
                                    setCount(Math.round(this.targets()[0].value));
                                },
                                onComplete: function () {
                                    setCount(end);
                                    counterRef.current.tween = null;
                                },
                            }
                        );
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
            if (counterRef.current.tween) {
                counterRef.current.tween.kill();
            }
        };
    }, [end, duration, delay]);

    return { count, ref: elementRef };
};
