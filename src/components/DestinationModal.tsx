import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Star, X, MessageSquare } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string | null;
  highlights: string[] | null;
  best_time_to_visit: string | null;
  average_cost: string | null;
  image_url: string | null;
}

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onStartPlanning: (destination: Destination) => void;
  image?: string;
}

export const DestinationModal = ({ 
  destination, 
  isOpen, 
  onClose, 
  onStartPlanning,
  image 
}: DestinationModalProps) => {
  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image || destination.image_url || '/placeholder.svg'} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white">{destination.name}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm opacity-90">{destination.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            {destination.description}
          </p>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-travel-coral" />
                Top Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {destination.highlights.map((highlight, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary"
                    className="bg-travel-sky/10 text-travel-sky border-travel-sky/20"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {destination.best_time_to_visit && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-travel-ocean mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Best Time to Visit</span>
                </div>
                <p className="text-sm text-foreground">{destination.best_time_to_visit}</p>
              </div>
            )}
            {destination.average_cost && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-travel-coral mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm font-medium">Average Cost</span>
                </div>
                <p className="text-sm text-foreground">{destination.average_cost}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg transition-all"
              onClick={() => onStartPlanning(destination)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Plan Trip to {destination.name}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
