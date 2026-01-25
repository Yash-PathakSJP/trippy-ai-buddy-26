import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Compass, Navigation } from "lucide-react";
import { useState } from "react";

interface PopularLocation {
  name: string;
  country: string;
  position: { top: string; left: string };
  visitors: string;
  badge: string;
}

export const MapSection = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  const popularLocations: PopularLocation[] = [
    { name: "Paris", country: "France", position: { top: "35%", left: "49%" }, visitors: "38M", badge: "Romance" },
    { name: "Tokyo", country: "Japan", position: { top: "38%", left: "82%" }, visitors: "32M", badge: "Culture" },
    { name: "New York", country: "USA", position: { top: "38%", left: "24%" }, visitors: "65M", badge: "Urban" },
    { name: "Dubai", country: "UAE", position: { top: "45%", left: "58%" }, visitors: "16M", badge: "Luxury" },
    { name: "London", country: "UK", position: { top: "33%", left: "48%" }, visitors: "30M", badge: "Historic" },
    { name: "Sydney", country: "Australia", position: { top: "72%", left: "85%" }, visitors: "16M", badge: "Beach" },
    { name: "Rio", country: "Brazil", position: { top: "68%", left: "32%" }, visitors: "7M", badge: "Festival" },
    { name: "Rome", country: "Italy", position: { top: "40%", left: "51%" }, visitors: "10M", badge: "Ancient" },
  ];

  const continents = [
    { name: "All", value: "all" },
    { name: "Europe", value: "europe" },
    { name: "Asia", value: "asia" },
    { name: "Americas", value: "americas" },
    { name: "Africa", value: "africa" },
    { name: "Oceania", value: "oceania" },
  ];

  const stats = [
    { label: "Countries Covered", value: "150+", icon: Globe },
    { label: "Popular Destinations", value: "500+", icon: MapPin },
    { label: "Travelers Helped", value: "100K+", icon: Compass },
    { label: "Active Tours", value: "1,200+", icon: Navigation },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-background via-travel-ocean/5 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-block">
            <Badge className="bg-gradient-to-r from-travel-coral to-travel-sunset text-white px-4 py-2 text-sm font-semibold">
              <Globe className="h-3 w-3 mr-2 inline" />
              Global Coverage
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Explore Our
            <span className="block bg-gradient-to-r from-travel-coral via-travel-sky to-travel-ocean bg-clip-text text-transparent mt-2">
              Worldwide Network
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover destinations across all continents with our AI-powered travel assistant
          </p>
        </div>

        {/* Continent Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {continents.map((continent) => (
            <Button
              key={continent.value}
              variant={selectedContinent === continent.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedContinent(continent.value)}
              className={`
                transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2
                ${selectedContinent === continent.value 
                  ? "bg-gradient-to-r from-travel-sky to-travel-ocean shadow-lg scale-105" 
                  : "hover:border-travel-sky/50 hover:text-travel-sky"
                }
              `}
            >
              {continent.name}
            </Button>
          ))}
        </div>

        {/* Interactive Map */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-travel-sky/20 p-4 sm:p-6 md:p-8 mb-8 md:mb-12">
          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden bg-gradient-to-br from-travel-sky/10 via-travel-ocean/10 to-travel-coral/10 border border-travel-sky/30">
            {/* World Map Background SVG Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                {/* Simple world continents outline */}
                <path d="M 100 150 Q 150 120 200 150 L 250 140 L 300 160 L 280 200 L 250 220 L 200 210 L 150 190 Z" fill="currentColor" className="text-travel-sky/30" />
                <path d="M 350 180 Q 420 160 480 180 L 520 170 L 560 190 L 540 230 L 500 250 L 450 240 L 380 220 Z" fill="currentColor" className="text-travel-ocean/30" />
                <path d="M 600 200 L 680 190 L 750 210 L 770 250 L 740 280 L 680 270 L 620 250 Z" fill="currentColor" className="text-travel-coral/30" />
                <path d="M 200 280 L 280 270 L 320 300 L 300 350 L 250 370 L 200 340 Z" fill="currentColor" className="text-travel-sky/30" />
                <path d="M 700 320 L 780 310 L 820 340 L 800 380 L 750 390 L 700 360 Z" fill="currentColor" className="text-travel-ocean/30" />
              </svg>
            </div>

            {/* Location Pins */}
            {popularLocations.map((location, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ top: location.position.top, left: location.position.left }}
                onMouseEnter={() => setHoveredLocation(location.name)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Pin Icon */}
                <div className={`
                  transition-all duration-300
                  ${hoveredLocation === location.name ? "scale-125" : "scale-100 hover:scale-110"}
                `}>
                  <MapPin 
                    className={`
                      h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300
                      ${hoveredLocation === location.name 
                        ? "text-travel-coral drop-shadow-lg animate-bounce" 
                        : "text-travel-sky"
                      }
                    `}
                    fill="currentColor"
                  />
                </div>

                {/* Pulse Effect */}
                <div className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-travel-sky
                  ${hoveredLocation === location.name ? "animate-ping" : ""}
                `} />

                {/* Info Card on Hover */}
                {hoveredLocation === location.name && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20 animate-fade-in">
                    <Card className="p-2 sm:p-3 bg-background/95 backdrop-blur-sm border-travel-sky/50 shadow-xl">
                      <div className="text-xs sm:text-sm">
                        <p className="font-bold text-foreground">{location.name}</p>
                        <p className="text-muted-foreground text-xs">{location.country}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            {location.badge}
                          </Badge>
                          <span className="text-xs text-travel-sky font-semibold">{location.visitors}/year</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            ))}

            {/* Grid Lines for depth */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full grid grid-cols-12 grid-rows-6 opacity-10">
                {[...Array(72)].map((_, i) => (
                  <div key={i} className="border border-travel-sky/20" />
                ))}
              </div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-travel-sky" fill="currentColor" />
              <span>Popular Destination</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-travel-coral animate-pulse" />
              <span>Trending Now</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-travel-ocean" />
              <span>150+ Countries Available</span>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-4 sm:p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-background to-muted/30 border-2 hover:border-travel-sky/50 group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-travel-sky/20 to-travel-ocean/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-travel-sky" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
