import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, MapPin, Calendar, MessageSquare, Sparkles, Globe } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { ItineraryCard } from "@/components/ItineraryCard";
import { useState } from "react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-sky flex items-center justify-center">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-sky bg-clip-text text-transparent">Trippy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <Button variant="default" onClick={() => setShowChat(true)}>Start Planning</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Your AI Travel Buddy</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Meet Trippy, Your Travel Companion
            </h1>
            <p className="text-xl text-muted-foreground">
              Plan your perfect trip with AI-powered itineraries, smart recommendations, and a friendly chatbot that understands exactly what you want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg" onClick={() => setShowChat(true)}>
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with Trippy
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Globe className="mr-2 h-5 w-5" />
                Explore Demo
              </Button>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-sky opacity-20 blur-3xl rounded-full"></div>
            <Card className="p-8 shadow-card-hover relative">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-sunset flex items-center justify-center animate-float">
                    <Plane className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Hi! I'm Trippy 👋</p>
                    <p className="text-sm text-muted-foreground">Ready to plan your adventure?</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="text-sm text-foreground">Where would you like to go?</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-background px-3 py-1 rounded-full text-xs border border-border">🗼 Paris</span>
                    <span className="bg-background px-3 py-1 rounded-full text-xs border border-border">🗾 Tokyo</span>
                    <span className="bg-background px-3 py-1 rounded-full text-xs border border-border">🏝️ Bali</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-background">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">Everything You Need for the Perfect Trip</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From planning to exploring, Trippy makes travel simple, fun, and personalized.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MessageSquare,
              title: "Smart Chat Planning",
              description: "Just tell Trippy where you want to go and when. Natural conversations make planning effortless.",
              color: "bg-gradient-sky"
            },
            {
              icon: MapPin,
              title: "Visual Itineraries",
              description: "See your trip come to life with interactive maps, beautiful cards, and drag-and-drop planning.",
              color: "bg-gradient-sunset"
            },
            {
              icon: Calendar,
              title: "Flexible Scheduling",
              description: "Adjust your plans on the fly. Add attractions, switch dates, and optimize your route instantly.",
              color: "bg-gradient-sky"
            }
          ].map((feature, i) => (
            <Card key={i} className="p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className={`h-12 w-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample Itinerary Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">See Your Trip Come to Life</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's how your personalized itinerary might look
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <ItineraryCard
            day={1}
            title="Arrival in Paris"
            activities={[
              { time: "10:00 AM", name: "Hotel Check-in", location: "Le Marais District" },
              { time: "2:00 PM", name: "Eiffel Tower Visit", location: "Champ de Mars" },
              { time: "7:00 PM", name: "Seine River Cruise", location: "Port de la Bourdonnais" }
            ]}
          />
          <ItineraryCard
            day={2}
            title="Exploring the City"
            activities={[
              { time: "9:00 AM", name: "Louvre Museum", location: "Rue de Rivoli" },
              { time: "1:00 PM", name: "Lunch at Café", location: "Latin Quarter" },
              { time: "4:00 PM", name: "Notre-Dame", location: "Île de la Cité" }
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-sky text-primary-foreground p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let Trippy create your perfect itinerary in minutes, not hours.
          </p>
          <Button size="lg" variant="secondary" className="text-lg" onClick={() => setShowChat(true)}>
            <Sparkles className="mr-2 h-5 w-5" />
            Plan My Trip Now
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Trippy - Your AI Travel Companion. Making travel planning fun and easy.</p>
        </div>
      </footer>

      {/* Chat Interface Modal */}
      {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default Index;
