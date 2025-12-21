import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, TrendingUp, Clock, Sparkles, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DestinationModal } from "./DestinationModal";

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

interface HeroChatPreviewProps {
  onStartChat: (destinationName?: string) => void;
  destinationImages: Record<string, string>;
}

export const HeroChatPreview = ({ onStartChat, destinationImages }: HeroChatPreviewProps) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typingText, setTypingText] = useState("");
  const fullText = "Where shall we explore next?";

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Fetch destinations from database
  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .in('name', ['Paris', 'Tokyo', 'Bali'])
        .limit(3);
      
      if (data && !error) {
        setDestinations(data);
      }
      setIsLoading(false);
    };

    fetchDestinations();
  }, []);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const handleStartPlanning = (destination: Destination) => {
    setIsModalOpen(false);
    onStartChat(destination.name);
  };

  const getDestinationGradient = (name: string) => {
    const gradients: Record<string, string> = {
      'Paris': 'from-travel-sky to-travel-ocean',
      'Tokyo': 'from-travel-coral to-travel-sunset',
      'Bali': 'from-green-400 to-travel-sky'
    };
    return gradients[name] || 'from-travel-sky to-travel-ocean';
  };

  return (
    <>
      <div className="relative animate-slide-up">
        <div className="absolute -inset-4 bg-gradient-to-r from-travel-sky via-travel-coral to-travel-sunset opacity-20 blur-3xl rounded-full animate-pulse"></div>
        
        <Card className="p-8 shadow-2xl relative bg-gradient-to-br from-background to-muted/30 border-2 hover:shadow-xl transition-all duration-500 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-travel-sky/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-travel-coral/10 to-transparent rounded-tr-full" />

          <div className="space-y-6 relative">
            {/* Header with avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-travel-coral to-travel-sunset flex items-center justify-center shadow-lg animate-float">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <p className="font-bold text-xl text-foreground flex items-center gap-2">
                  Hi! I'm Trippy
                  <Sparkles className="h-4 w-4 text-travel-coral animate-pulse" />
                </p>
                <p className="text-muted-foreground">Your friendly travel companion</p>
              </div>
            </div>
            
            {/* Chat bubble with typing effect */}
            <div className="bg-gradient-to-br from-travel-sky/10 to-travel-ocean/10 rounded-2xl p-5 border border-travel-sky/20 space-y-4 relative">
              <div className="absolute -top-2 left-6 w-4 h-4 bg-gradient-to-br from-travel-sky/10 to-travel-ocean/10 rotate-45 border-l border-t border-travel-sky/20" />
              
              <p className="font-medium text-foreground min-h-[1.5rem]">
                {typingText}
                <span className="animate-pulse">|</span>
              </p>
              
              {/* Destination buttons */}
              <div className="flex gap-2 flex-wrap">
                {isLoading ? (
                  <>
                    <div className="h-10 w-20 bg-muted animate-pulse rounded-full" />
                    <div className="h-10 w-20 bg-muted animate-pulse rounded-full" />
                    <div className="h-10 w-20 bg-muted animate-pulse rounded-full" />
                  </>
                ) : (
                  destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleDestinationClick(dest)}
                      className={`bg-gradient-to-r ${getDestinationGradient(dest.name)} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 flex items-center gap-1 group`}
                    >
                      {dest.name}
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))
                )}
              </div>
              
              <p className="text-sm text-muted-foreground italic">
                Click a destination to learn more, or tell me your dream!
              </p>
            </div>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors group cursor-pointer" onClick={() => onStartChat()}>
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-muted-foreground font-medium">Smart Routes</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors group cursor-pointer" onClick={() => onStartChat()}>
                <Clock className="h-6 w-6 mx-auto mb-2 text-travel-coral group-hover:scale-110 transition-transform" />
                <p className="text-xs text-muted-foreground font-medium">Real-time Updates</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className="w-full bg-gradient-to-r from-travel-coral to-travel-sunset hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-white font-semibold py-6"
              onClick={() => onStartChat()}
            >
              Start Planning Your Adventure
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartPlanning={handleStartPlanning}
        image={selectedDestination ? destinationImages[selectedDestination.name] : undefined}
      />
    </>
  );
};
