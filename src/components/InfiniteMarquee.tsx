import { useState } from "react";

interface MarqueeItem {
  image: string;
  name: string;
  location: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  direction?: "left" | "right";
}

export function InfiniteMarquee({ 
  items, 
  speed = 30,
  direction = "left" 
}: InfiniteMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div 
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div
        className={`flex gap-6 ${isPaused ? '' : 'animate-marquee'}`}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="relative group flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Neon glow overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-travel-ocean/80 via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 neon-border" />
            
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="font-bold text-white text-lg">{item.name}</h4>
              <p className="text-white/80 text-sm">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
