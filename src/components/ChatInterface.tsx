import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Plane, MapPin, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  onClose: () => void;
  initialDestination?: string;
}

export const ChatInterface = ({ onClose, initialDestination }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      // Create a new conversation
      const { data: user } = await supabase.auth.getUser();
      
      const { data: conversation, error } = await supabase
        .from('conversations')
        .insert({
          session_id: sessionId,
          user_id: user?.user?.id || null
        })
        .select()
        .single();

      if (conversation && !error) {
        setConversationId(conversation.id);
        
        // Add initial greeting
        const greetingContent = initialDestination 
          ? `Hi! I'm Trippy, your travel buddy! I see you're interested in ${initialDestination}! That's an amazing choice. ${getDestinationInfo(initialDestination)} What would you like to know about your trip?`
          : "Hi! I'm Trippy, your travel buddy! Where would you like to go, and when are you thinking of traveling?";
        
        const { data: savedMessage } = await supabase
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            role: 'assistant',
            content: greetingContent
          })
          .select()
          .single();

        if (savedMessage) {
          setMessages([{ id: savedMessage.id, role: 'assistant', content: greetingContent }]);
        }
      }
    };

    initConversation();
  }, [sessionId, initialDestination]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getDestinationInfo = (destination: string): string => {
    const info: Record<string, string> = {
      'Paris': "The City of Light is perfect for romance, art lovers, and food enthusiasts. The Eiffel Tower, Louvre, and charming cafés await you!",
      'Tokyo': "A fascinating blend of ancient traditions and cutting-edge technology. From serene temples to neon-lit streets, Tokyo has it all!",
      'Bali': "The Island of Gods offers stunning rice terraces, beautiful temples, and incredible beaches. Perfect for relaxation and adventure!"
    };
    return info[destination] || "Let me help you plan an incredible adventure there!";
  };

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return;

    const userContent = input;
    setInput("");
    setIsLoading(true);

    // Add user message optimistically
    const userMessage: Message = { role: "user", content: userContent };
    setMessages(prev => [...prev, userMessage]);

    // Save user message to database
    await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: 'user',
        content: userContent
      });

    // Generate AI response (simulated for now)
    setTimeout(async () => {
      const responses = [
        `That sounds amazing! Based on what you've told me, I can help plan the perfect itinerary. What's your budget like for this trip?`,
        `Great choice! I know some incredible spots there. How many days are you planning to stay?`,
        `Wonderful! Would you like me to include popular attractions, hidden local gems, or a mix of both?`,
        `Perfect! I'll craft a personalized itinerary just for you. Are you traveling solo, with family, or friends?`,
        `I love your enthusiasm! Let me suggest some must-see places and experiences. Do you prefer cultural sites, nature, or nightlife?`
      ];
      
      const aiContent = responses[Math.floor(Math.random() * responses.length)];
      
      // Save AI message to database
      const { data: savedAiMessage } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          role: 'assistant',
          content: aiContent
        })
        .select()
        .single();

      if (savedAiMessage) {
        setMessages(prev => [...prev, { id: savedAiMessage.id, role: 'assistant', content: aiContent }]);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const quickActions = [
    { icon: MapPin, label: "Popular Destinations", action: "Show me popular destinations" },
    { icon: Calendar, label: "Plan Weekend Trip", action: "Help me plan a weekend getaway" },
    { icon: Plane, label: "International Travel", action: "I want to travel internationally" }
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
    // Small delay to show the input before sending
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl border-2 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-travel-sky to-travel-ocean">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Chat with Trippy</h3>
              <p className="text-sm text-white/80">Your AI travel companion</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/30 to-background">
          {messages.map((message, i) => (
            <div
              key={message.id || i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-travel-coral to-travel-sunset flex items-center justify-center mr-2 flex-shrink-0">
                  <Plane className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-travel-sky to-travel-ocean text-white rounded-br-md"
                    : "bg-card text-foreground border border-border rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-travel-coral to-travel-sunset flex items-center justify-center mr-2">
                <Plane className="h-4 w-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-travel-sky" />
                  <span className="text-sm text-muted-foreground">Trippy is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="text-xs hover:bg-travel-sky/10 hover:border-travel-sky hover:text-travel-sky transition-all"
                onClick={() => handleQuickAction(action.action)}
                disabled={isLoading}
              >
                <action.icon className="h-3 w-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message or ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              className="flex-1 border-2 focus:border-travel-sky transition-colors"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg transition-all px-6"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
