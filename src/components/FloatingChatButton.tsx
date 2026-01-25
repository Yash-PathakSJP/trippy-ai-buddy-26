import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Sparkles } from "lucide-react";

export function FloatingChatButton({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group">
      {/* Tooltip/Label - Hidden on mobile for space */}
      <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 hidden sm:block ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-travel-sky to-travel-ocean text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Chat with Trippy AI</span>
          </div>
          <div className="text-xs opacity-90 mt-1">Plan your perfect trip instantly!</div>
        </div>
        {/* Arrow */}
        <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-travel-ocean"></div>
      </div>

      {/* Button */}
      <Button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-travel-coral to-travel-sunset hover:shadow-2xl transition-all duration-300 hover:scale-110 shadow-lg active:scale-95"
      >
        <div className="relative">
          <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </Button>

      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-travel-coral to-travel-sunset opacity-20 animate-ping"></div>
    </div>
  );
}
