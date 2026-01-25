import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

interface DestinationCardProps {
  name: string;
  location: string;
  image: string;
  description: string;
  onClick?: () => void;
}

export const DestinationCard = ({ name, location, image, description, onClick }: DestinationCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-travel-sky/50">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={`${name}, ${location}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {description}
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-6 bg-gradient-to-br from-background to-muted/30">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground group-hover:text-travel-sky transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-travel-coral" />
            <span className="text-sm">{location}</span>
          </div>
          <Button 
            size="sm"
            onClick={onClick}
            className="bg-gradient-to-r from-travel-coral to-travel-sunset hover:shadow-lg hover:scale-105 active:scale-95 text-xs sm:text-sm h-7 sm:h-9 px-2 sm:px-4 transition-all duration-200"
          >
            <span className="hidden sm:inline">Explore</span>
            <span className="sm:hidden">Go</span>
            <ArrowRight className="ml-0 sm:ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
