import { useGSAPCounter } from "@/hooks/use-gsap-counter";

interface AnimatedStatProps {
  value: string;
  label: string;
  delay?: number;
}

export function AnimatedStat({ value, label, delay = 0 }: AnimatedStatProps) {
  // Parse the numeric value and suffix
  const numericMatch = value.match(/^([\d,]+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1].replace(/,/g, '')) : 0;
  const suffix = value.replace(/^[\d,]+/, '');

  const { count, ref } = useGSAPCounter({
    end: numericValue,
    duration: 2000 + delay,
    delay
  });

  // Format with commas
  const formattedCount = count.toLocaleString();

  return (
    <div
      ref={ref}
      className="text-center group animate-fade-in"
    >
      <div className="relative">
        {/* Neon glow effect behind the number */}
        <div className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 bg-gradient-to-r from-travel-sky/80 to-travel-ocean/80 rounded-full scale-150" />

        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent mb-2 relative neon-text">
          {formattedCount}{suffix}
        </div>
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
