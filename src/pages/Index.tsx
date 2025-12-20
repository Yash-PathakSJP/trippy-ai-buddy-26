import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, MapPin, Calendar, MessageSquare, Sparkles, Globe, Users, Star, Zap, Heart, Camera, Compass, TrendingUp, Shield, Clock, LogIn, Mail, Phone, Send, Instagram, Twitter, Facebook, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { ItineraryCard } from "@/components/ItineraryCard";
import { DestinationCard } from "@/components/DestinationCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedStat } from "@/components/AnimatedStat";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import londonImg from "@/assets/destinations/london.jpg";
import parisImg from "@/assets/destinations/paris.jpg";
import tajMahalImg from "@/assets/destinations/taj-mahal.jpg";
import newYorkImg from "@/assets/destinations/new-york.jpg";
import tokyoImg from "@/assets/destinations/tokyo.jpg";
import egyptImg from "@/assets/destinations/egypt.jpg";
import dubaiImg from "@/assets/destinations/dubai.jpg";
import sydneyImg from "@/assets/destinations/sydney.jpg";
const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const destinations = [
    {
      name: "London",
      location: "United Kingdom",
      image: londonImg,
      description: "Explore iconic landmarks like Big Ben, Tower Bridge, and the British Museum"
    },
    {
      name: "Paris",
      location: "France",
      image: parisImg,
      description: "Experience the romance of the Eiffel Tower, Louvre, and charming cafés"
    },
    {
      name: "Taj Mahal",
      location: "Agra, India",
      image: tajMahalImg,
      description: "Marvel at the breathtaking white marble monument to eternal love"
    },
    {
      name: "New York",
      location: "United States",
      image: newYorkImg,
      description: "Discover the Statue of Liberty, Times Square, and endless possibilities"
    },
    {
      name: "Tokyo",
      location: "Japan",
      image: tokyoImg,
      description: "Immerse yourself in the perfect blend of tradition and innovation"
    },
    {
      name: "Pyramids of Giza",
      location: "Egypt",
      image: egyptImg,
      description: "Witness the ancient wonders and mysteries of the pharaohs"
    },
    {
      name: "Dubai",
      location: "United Arab Emirates",
      image: dubaiImg,
      description: "Experience luxury at Burj Khalifa and futuristic architecture"
    },
    {
      name: "Sydney",
      location: "Australia",
      image: sydneyImg,
      description: "Enjoy the Opera House, Harbour Bridge, and stunning beaches"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "150+", label: "Countries Covered" },
    { number: "50,000+", label: "Trips Planned" },
    { number: "4.9★", label: "User Rating" }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Conversations",
      description: "Chat naturally with Trippy in your language. Tell me your dreams, and I'll craft the perfect adventure tailored just for you.",
      gradient: "from-travel-sky to-travel-ocean"
    },
    {
      icon: MapPin,
      title: "Interactive Visual Maps",
      description: "Watch your journey unfold on beautiful maps with drag-and-drop pins, routes, and hidden gems only locals know about.",
      gradient: "from-travel-coral to-travel-sunset"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimize every moment! I'll balance your time perfectly between must-see attractions and spontaneous discoveries.",
      gradient: "from-travel-ocean to-purple-500"
    },
    {
      icon: Camera,
      title: "Expense Tracking",
      description: "Snap photos of receipts, set budgets, and track spending effortlessly. No more vacation budget surprises!",
      gradient: "from-travel-sunset to-red-500"
    },
    {
      icon: Users,
      title: "Collaborative Planning",
      description: "Invite friends and family! Plan together in real-time, vote on activities, and build unforgettable group adventures.",
      gradient: "from-green-400 to-travel-sky"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Speak to me in any language! I understand you perfectly and can help you navigate anywhere in the world.",
      gradient: "from-travel-coral to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "San Francisco, USA",
      text: "Trippy made planning my 3-week European adventure so easy! The AI knew exactly what I wanted before I even finished asking. Absolutely magical!",
      rating: 5,
      initials: "SC"
    },
    {
      name: "Marco Rodriguez",
      location: "Barcelona, Spain",
      text: "I've used many travel planners, but Trippy is different. It feels like having a knowledgeable friend who genuinely cares about your experience.",
      rating: 5,
      initials: "MR"
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      text: "The multilingual support is incredible! Trippy helped me plan a trip to Italy even though I only speak Japanese. Game changer!",
      rating: 5,
      initials: "YT"
    }
  ];

  const howItWorks = [
    { step: 1, title: "Tell Me Your Dreams", description: "Share where you want to go, when, and what excites you most about travel" },
    { step: 2, title: "Watch Magic Happen", description: "I'll create a personalized itinerary with flights, hotels, and amazing experiences" },
    { step: 3, title: "Customize & Perfect", description: "Drag, drop, and adjust everything until it's exactly what you want" },
    { step: 4, title: "Explore with Confidence", description: "Take your polished plan and create memories that last forever" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center shadow-lg animate-neon-pulse">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent neon-text">Trippy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">Features</a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">Destinations</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">Reviews</a>
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Welcome back!</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="border-travel-coral text-travel-coral hover:bg-travel-coral hover:text-white transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/auth")}
                className="border-travel-sky text-travel-sky hover:bg-travel-sky hover:text-white transition-all duration-300"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
            <Button className="bg-gradient-to-r from-travel-coral to-travel-sunset hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => setShowChat(true)}>
              Start Planning
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {!user && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-5 w-5" />
              </Button>
            )}
            <Button className="bg-gradient-to-r from-travel-coral to-travel-sunset hover:scale-105 transition-all duration-300" onClick={() => setShowChat(true)}>
              Chat Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-travel-cream/30 via-background to-travel-sky/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZWE1ZTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-travel-coral to-travel-sunset rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg">
                <Sparkles className="h-4 w-4" />
                <span>Powered by Advanced AI</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Your Personal
                <span className="block bg-gradient-to-r from-travel-sky via-travel-ocean to-purple-600 bg-clip-text text-transparent mt-2">
                  AI Travel Buddy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Meet <span className="font-handwriting text-3xl text-travel-coral">Trippy</span> - your cheerful companion who turns travel planning from overwhelming to absolutely delightful!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-xl hover:scale-105 transition-all duration-300 group" onClick={() => setShowChat(true)}>
                  <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Chat with Trippy
                </Button>
                <Button size="lg" variant="outline" className="text-lg border-2 hover:bg-muted hover:scale-105 transition-all duration-300 group">
                  <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-muted-foreground">Made with Love</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="absolute -inset-4 bg-gradient-to-r from-travel-sky via-travel-coral to-travel-sunset opacity-20 blur-3xl rounded-full animate-pulse"></div>
              
              <Card className="p-8 shadow-2xl relative bg-gradient-to-br from-background to-muted/30 border-2 hover:neon-border transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-travel-coral to-travel-sunset flex items-center justify-center shadow-lg animate-float">
                      <Plane className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-foreground">Hi! I'm Trippy</p>
                      <p className="text-muted-foreground">Your friendly travel companion</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-travel-sky/10 to-travel-ocean/10 rounded-xl p-5 border border-travel-sky/20 space-y-3">
                    <p className="font-medium text-foreground">Where shall we explore next?</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-gradient-to-r from-travel-sky to-travel-ocean text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform cursor-pointer">Paris</span>
                      <span className="bg-gradient-to-r from-travel-coral to-travel-sunset text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform cursor-pointer">Tokyo</span>
                      <span className="bg-gradient-to-r from-green-400 to-travel-sky text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform cursor-pointer">Bali</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">Or tell me your dream destination!</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <TrendingUp className="h-6 w-6 mx-auto mb-1 text-green-500" />
                      <p className="text-xs text-muted-foreground">Smart Routes</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <Clock className="h-6 w-6 mx-auto mb-1 text-travel-coral" />
                      <p className="text-xs text-muted-foreground">Real-time Updates</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Infinite Scrolling Image Reel */}
          <div className="mt-16 -mx-4 md:-mx-8">
            <InfiniteMarquee 
              items={destinations.map(d => ({ image: d.image, name: d.name, location: d.location }))}
              speed={40}
            />
          </div>

          {/* Stats Section with Animated Counters */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat 
                key={i} 
                value={stat.number} 
                label={stat.label}
                delay={i * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <Badge className="bg-gradient-to-r from-travel-coral to-travel-sunset text-white px-4 py-2 text-sm font-semibold">
                Powerful Features
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything You Need for
              <span className="block bg-gradient-to-r from-travel-coral to-travel-sunset bg-clip-text text-transparent mt-2">
                The Perfect Journey
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From dreaming to doing, Trippy handles every detail so you can focus on making memories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card 
                key={i} 
                className="p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border-2 hover:border-travel-sky/50 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-travel-sky transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-travel-cream/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Plan Your Trip in
              <span className="block bg-gradient-to-r from-travel-sky to-purple-600 bg-clip-text text-transparent mt-2">
                4 Simple Steps
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              It's so easy, you'll wonder why you ever stressed about travel planning!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="bg-gradient-to-br from-background to-muted border-2 border-dashed border-travel-sky/30 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-travel-sky/60">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 animate-pulse">
                    <ArrowRight className="h-8 w-8 text-travel-sky/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sample Itinerary */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">See Your Trip Come to Life</h3>
            <p className="text-lg text-muted-foreground">Here's what a Trippy itinerary looks like</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <ItineraryCard
              day={1}
              title="Arrival in Paris - The City of Lights!"
              activities={[
                { time: "10:00 AM", name: "Hotel Check-in at Le Marais", location: "Le Marais District, Paris" },
                { time: "2:00 PM", name: "Eiffel Tower Experience", location: "Champ de Mars, 5 Avenue Anatole" },
                { time: "7:00 PM", name: "Romantic Seine River Cruise", location: "Port de la Bourdonnais" }
              ]}
            />
            <ItineraryCard
              day={2}
              title="Cultural Immersion Day"
              activities={[
                { time: "9:00 AM", name: "Louvre Museum Tour", location: "Rue de Rivoli, 75001" },
                { time: "1:00 PM", name: "French Cuisine at Bistro", location: "Latin Quarter, Rue Mouffetard" },
                { time: "4:00 PM", name: "Notre-Dame Cathedral", location: "Île de la Cité, 6 Parvis" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Loved by Travelers
              <span className="block bg-gradient-to-r from-travel-coral via-travel-sunset to-red-500 bg-clip-text text-transparent mt-2">
                Around the World
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from adventurers who've traveled with Trippy!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-background to-muted/30 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center text-sm font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-24 bg-gradient-to-br from-background via-travel-cream/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <Badge className="bg-gradient-to-r from-travel-sky to-travel-ocean text-white px-4 py-2 text-sm font-semibold">
                Explore the World
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Explore Hundreds of Places
              <span className="block bg-gradient-to-r from-travel-sky via-purple-600 to-travel-coral bg-clip-text text-transparent mt-2">
                From Every Corner of the World
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From ancient wonders to modern marvels, discover iconic destinations that will take your breath away
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, i) => (
              <div key={i} className="animate-fade-in hover:scale-105 transition-transform duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              onClick={() => setShowChat(true)}
            >
              <Globe className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Discover More Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-travel-sky via-travel-ocean to-purple-600"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTEyIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
            
            <div className="relative p-12 md:p-16 text-center text-white">
              <div className="inline-block mb-6">
                <Sparkles className="h-16 w-16 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let Trippy transform your travel dreams into reality. Your perfect itinerary is just a conversation away!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg bg-white text-travel-sky hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl font-semibold"
                  onClick={() => setShowChat(true)}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Planning Now - It's Free!
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Watch 2-Min Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-gradient-to-b from-muted/30 via-muted/50 to-muted py-16">
        <div className="container mx-auto px-4">
          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-travel-sky/10 to-travel-ocean/10 rounded-2xl p-8 md:p-12 mb-16 border border-travel-sky/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Stay Updated with Travel Tips</h3>
                <p className="text-muted-foreground">Get exclusive destination guides, travel deals, and insider tips delivered to your inbox.</p>
              </div>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-travel-sky/50 transition-all"
                />
                <Button className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg hover:scale-105 transition-all duration-300 px-6">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center shadow-lg">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent">Trippy</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">Your cheerful AI travel companion, making every journey unforgettable. Plan smarter, travel better.</p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-travel-sky/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-travel-sky transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-travel-coral/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-travel-coral transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-blue-600/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-red-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Youtube className="h-5 w-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Features Column */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Features</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> AI Chat</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300 flex items-center gap-2"><Calendar className="h-4 w-4" /> Smart Itineraries</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Expense Tracking</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300 flex items-center gap-2"><Users className="h-4 w-4" /> Group Planning</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300 flex items-center gap-2"><Globe className="h-4 w-4" /> Multilingual</a></li>
              </ul>
            </div>
            
            {/* Destinations Column */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Top Destinations</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Paris, France</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Tokyo, Japan</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">New York, USA</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">London, UK</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Dubai, UAE</a></li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Press Kit</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Partners</a></li>
              </ul>
            </div>
            
            {/* Support Column */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors duration-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="border-t border-b border-border py-6 mb-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-sm text-muted-foreground">
              <a href="mailto:hello@trippy.ai" className="flex items-center gap-2 hover:text-travel-sky transition-colors duration-300">
                <Mail className="h-4 w-4" />
                hello@trippy.ai
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-travel-sky transition-colors duration-300">
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </span>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Trippy AI Travel Companion. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Terms</a>
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Cookies</a>
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Interface Modal */}
      {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
    </div>
  );
};

const Badge = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center ${className}`}>{children}</span>
);

export default Index;
