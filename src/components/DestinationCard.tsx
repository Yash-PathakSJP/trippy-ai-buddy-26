import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface DestinationCardProps {
  name: string;
  location: string;
  image: string;
  description: string;
}

export const DestinationCard = ({ name, location, image, description }: DestinationCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 hover:border-travel-sky/50">
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
      <div className="p-6 bg-gradient-to-br from-background to-muted/30">
        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-travel-sky transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-travel-coral" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
    </Card>
  );
};
