import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Plane, MapPin, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateContent } from "@/lib/gemini";
import {
  extractTripDetails,
  generateFollowUpQuestions,
  generateItinerary,
  generateBookingGuidance,
  suggestDestinations,
  TripContext
} from "@/lib/travelPlanner";
import {
  initializeConversationState,
  updateConversationState,
  isReadyForPlanning,
  isReadyForBooking,
  ConversationState,
  determineNextStage
} from "@/lib/conversationState";

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
  const [conversationState, setConversationState] = useState<ConversationState | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      // Initialize conversation state
      const initialState = initializeConversationState(initialDestination);
      setConversationState(initialState);

      // Create a new conversation in database
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
        
        // Generate initial greeting based on state
        let greetingContent: string;
        
        if (initialDestination) {
          greetingContent = `Hi! I'm Trippy, your AI travel buddy! 🌍 I see you're interested in ${initialDestination}—great choice! 

To create the perfect itinerary for you, I'll need a few quick details:
• How many days are you planning to spend there?
• What's your budget range?
• Are you traveling solo, with family, or friends?
• What interests you most? (nature, food, culture, adventure, history, nightlife?)

Let's plan something amazing! ✈️`;
        } else {
          greetingContent = `👋 Hey! I'm Trippy, your AI travel buddy! I'm here to help you plan an incredible trip from start to finish.

Whether you know exactly where you want to go or need recommendations, I've got you covered. Let's start with the essentials:

**Where would you like to travel?** Tell me your destination (or describe what kind of trip appeals to you), and we'll go from there! 🗺️`;
        }
        
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


  /**
   * Generates AI response based on conversation state and user input.
   */
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!conversationState) return "";

    try {
      // Step 1: Extract trip details from user message
      const { extractedContext, missingFields } = await extractTripDetails(
        userMessage,
        conversationState.tripContext
      );

      // Step 2: Update conversation state
      const newState = updateConversationState(conversationState, extractedContext, missingFields);
      setConversationState(newState);

      // Step 3: Decide response based on conversation stage
      let response = "";

      if (isReadyForPlanning(newState) && !newState.itinerary) {
        // Generate full itinerary
        response = await generateItinerary(newState.tripContext);
        setConversationState(prev => prev ? { ...prev, itinerary: response, stage: "itinerary_ready" } : null);
      } else if (isReadyForBooking(newState)) {
        // User is ready to book - provide booking guidance
        response = await generateBookingGuidance(newState.tripContext, newState.itinerary || "");
        setConversationState(prev => prev ? { ...prev, stage: "booking_phase" } : null);
      } else if (missingFields.length > 0) {
        // Still missing details - ask smart follow-up questions
        const contextSummary = buildTripContextSummary(newState.tripContext);
        
        response = `Got it! ${contextSummary}\n\n`;
        
        const followUpQuestions = await generateFollowUpQuestions(newState.tripContext, missingFields);
        response += followUpQuestions;
      } else if (newState.itinerary) {
        // Itinerary exists, respond to user's question about it
        const contextualResponse = await generateContextualResponse(
          userMessage,
          newState.tripContext,
          newState.itinerary
        );
        response = contextualResponse;
      } else {
        // Generic travel guidance
        response = await generateGenericGuidance(userMessage, newState.tripContext);
      }

      return response;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return getSmartFallback(conversationState);
    }
  };

  /**
   * Builds a summary of collected trip context.
   */
  const buildTripContextSummary = (context: TripContext): string => {
    const parts = [];
    if (context.destination) parts.push(`📍 **${context.destination}**`);
    if (context.duration?.days) parts.push(`📅 ${context.duration.days} days`);
    if (context.budget?.category) parts.push(`💰 ${context.budget.category} budget`);
    if (context.travelType) parts.push(`👥 ${context.travelType}`);
    if (context.interests?.length) parts.push(`❤️ ${context.interests.join(", ")}`);
    
    return parts.length > 0 ? parts.join(" • ") : "Let me understand your preferences better!";
  };

  /**
   * Generates contextual response when itinerary already exists.
   */
  const generateContextualResponse = async (
    userMessage: string,
    context: TripContext,
    itinerary: string
  ): Promise<string> => {
    const responsePrompt = `The user is discussing their itinerary for ${context.destination}. 
User message: "${userMessage}"

Itinerary excerpt:
${itinerary.substring(0, 800)}

Respond briefly (2-3 sentences) addressing their message. If they want to modify, ask what specifically to adjust.`;

    try {
      return await generateContent(responsePrompt);
    } catch {
      return "Tell me what you'd like to adjust in your itinerary!";
    }
  };

  /**
   * Generates generic travel guidance when details are partial.
   */
  const generateGenericGuidance = async (
    userMessage: string,
    context: TripContext
  ): Promise<string> => {
    const guidancePrompt = `You are Trippy, a helpful travel assistant. The user is asking:
"${userMessage}"

Known about their trip:
${JSON.stringify(context, null, 2)}

Provide a helpful, brief response (2-3 sentences) that advances trip planning. Ask relevant follow-up questions.`;

    try {
      return await generateContent(guidancePrompt);
    } catch {
      return `That's a great question! Tell me more about what you're looking for, and I'll provide specific recommendations! 🌟`;
    }
  };

  /**
   * Smart fallback message based on conversation state.
   */
  const getSmartFallback = (state: ConversationState | null): string => {
    if (!state) return `I'm experiencing a moment of inspiration lag! 😅 Try again in a moment, or tell me: Where do you want to travel?`;

    const fallbacks: Record<string, string[]> = {
      greeting: [
        "Where would you love to travel? 🌍",
        "Tell me your dream destination! ✈️",
        "What kind of trip are you dreaming of?"
      ],
      collecting_details: [
        `Great! So ${state.tripContext.destination || "your destination"} is locked in! What about budget and duration?`,
        "Perfect! What's your approximate budget for this adventure?",
        "Awesome choice! How many days are you planning?"
      ],
      ready_for_planning: [
        "All set! Let me craft your perfect itinerary... 🗺️",
        "I have everything I need. Creating your custom itinerary now! ✨"
      ],
      itinerary_ready: [
        "Your itinerary is ready! Would you like to adjust anything, or should we move to booking? 🎉",
        "Love the plan? Or would you like to tweak something? 💡"
      ],
      booking_phase: [
        "Ready to start booking? I'll guide you through each step! 🚀",
        "Let's make this trip happen! Here's your booking roadmap:"
      ]
    };

    const relevant = fallbacks[state.stage] || fallbacks.greeting;
    return relevant[Math.floor(Math.random() * relevant.length)];
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

    try {
      // Use new AI response generation with conversation state
      const aiContent = await generateAIResponse(userContent);
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
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback responses if API fails
      const aiContent = getSmartFallback(conversationState);
      // Save fallback message to database
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
    }
  };

  const quickActions = [
    { icon: MapPin, label: "Suggest Destinations", action: "Can you suggest some destinations for adventure lovers with a modest budget?" },
    { icon: Calendar, label: "Plan Weekend Trip", action: "I want to plan a 3-day weekend trip. I love nature and good food. Budget is moderate." },
    { icon: Plane, label: "Get Full Itinerary", action: "Paris, 5 days, moderate budget, solo travel, interested in culture and food" }
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
    // Small delay to show the input before sending
    setTimeout(() => {
      if (!isLoading) handleSend();
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <Card className="w-full max-w-2xl h-[85vh] sm:h-[600px] flex flex-col shadow-2xl border-2 overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-gradient-to-r from-travel-sky to-travel-ocean">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-base sm:text-lg truncate">Chat with Trippy</h3>
              <p className="text-xs sm:text-sm text-white/80 truncate">Your AI travel companion</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white hover:bg-white/20 rounded-full flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-muted/30 to-background">
          {messages.map((message, i) => (
            <div
              key={message.id || i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              {message.role === "assistant" && (
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-travel-coral to-travel-sunset flex items-center justify-center mr-2 flex-shrink-0">
                  <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-md text-sm sm:text-base ${
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
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-travel-coral to-travel-sunset flex items-center justify-center mr-2 flex-shrink-0">
                <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-3 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-travel-sky" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Trippy is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Quick actions:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quickActions.map((action, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="text-xs hover:bg-travel-sky/10 hover:border-travel-sky hover:text-travel-sky transition-all w-full justify-start"
                onClick={() => handleQuickAction(action.action)}
                disabled={isLoading}
              >
                <action.icon className="h-3 w-3 mr-1.5 flex-shrink-0" />
                <span className="truncate">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about destinations, itineraries..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              className="flex-1 border-2 focus:border-travel-sky transition-colors text-sm"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg transition-all px-3 sm:px-6 flex-shrink-0"
              disabled={isLoading || !input.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
