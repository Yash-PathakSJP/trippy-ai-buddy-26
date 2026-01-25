import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plane, MapPin, Calendar, MessageSquare, Sparkles, Globe, Users, Star, Zap, Heart, Camera, Compass, TrendingUp, Shield, Clock, LogIn, Mail, Phone, Send, Instagram, Twitter, Facebook, Linkedin, Youtube, ArrowRight, Search } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { ItineraryCard } from "@/components/ItineraryCard";
import { DestinationCard } from "@/components/DestinationCard";
import { DestinationModal } from "@/components/DestinationModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedStat } from "@/components/AnimatedStat";
import { SearchBar } from "@/components/SearchBar";
import { OffersSection } from "@/components/OffersSection";
import { PackagesSection } from "@/components/PackagesSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TrendingSection } from "@/components/TrendingSection";
import { MapSection } from "@/components/MapSection";
import { GoogleMapComponent } from "@/components/GoogleMapComponent";
import { useGSAPAnimation } from "@/hooks/use-gsap-animation";
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
import romeImg from "@/assets/destinations/rome.jpg";
import santoriniImg from "@/assets/destinations/santorini.jpg";
import machuPicchuImg from "@/assets/destinations/machu-picchu.jpg";
import baliImg from "@/assets/destinations/bali.jpg";
import barcelonaImg from "@/assets/destinations/barcelona.jpg";
import maldivesImg from "@/assets/destinations/maldives.jpg";
import swissAlpsImg from "@/assets/destinations/swiss-alps.jpg";
import rioImg from "@/assets/destinations/rio.jpg";
import singaporeImg from "@/assets/destinations/singapore.jpg";
import veniceImg from "@/assets/destinations/venice.jpg";
import capeTownImg from "@/assets/destinations/cape-town.jpg";
import icelandImg from "@/assets/destinations/iceland.jpg";
import petraImg from "@/assets/destinations/petra.jpg";
import greatWallImg from "@/assets/destinations/great-wall.jpg";
import amsterdamImg from "@/assets/destinations/amsterdam.jpg";

interface DestinationType {
  name: string;
  location: string;
  image: string;
  description?: string;
}

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

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [initialDestination, setInitialDestination] = useState<string | undefined>();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const navigate = useNavigate();
  const animationRef = useGSAPAnimation();

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

  const handleStartChat = (destinationName?: string) => {
    setInitialDestination(destinationName);
    setShowChat(true);
  };

  const handleDestinationClick = (destination: DestinationType) => {
    setSelectedDestination({
      id: destination.name,
      name: destination.name,
      location: destination.location,
      description: destination.description || `Explore the amazing ${destination.name} and discover its unique charm and attractions.`,
      highlights: null,
      best_time_to_visit: null,
      average_cost: null,
      image_url: destination.image
    });
    setIsDestinationModalOpen(true);
  };

  const handleStartPlanningFromModal = (destination: Destination) => {
    setIsDestinationModalOpen(false);
    handleStartChat(`${destination.name}, ${destination.location}`);
  };

  // First reel destinations (left to right)
  const destinations = [
    { name: "London", location: "United Kingdom", image: londonImg, description: "Explore iconic landmarks like Big Ben, Tower Bridge, and the British Museum" },
    { name: "Paris", location: "France", image: parisImg, description: "Experience the romance of the Eiffel Tower, Louvre, and charming cafés" },
    { name: "Taj Mahal", location: "Agra, India", image: tajMahalImg, description: "Marvel at the breathtaking white marble monument to eternal love" },
    { name: "New York", location: "United States", image: newYorkImg, description: "Discover the Statue of Liberty, Times Square, and endless possibilities" },
    { name: "Tokyo", location: "Japan", image: tokyoImg, description: "Immerse yourself in the perfect blend of tradition and innovation" },
    { name: "Pyramids of Giza", location: "Egypt", image: egyptImg, description: "Witness the ancient wonders and mysteries of the pharaohs" },
    { name: "Dubai", location: "United Arab Emirates", image: dubaiImg, description: "Experience luxury at Burj Khalifa and futuristic architecture" },
    { name: "Sydney", location: "Australia", image: sydneyImg, description: "Enjoy the Opera House, Harbour Bridge, and stunning beaches" }
  ];

  // Second reel destinations (right to left)
  const destinations2 = [
    { name: "Rome", location: "Italy", image: romeImg },
    { name: "Santorini", location: "Greece", image: santoriniImg },
    { name: "Machu Picchu", location: "Peru", image: machuPicchuImg },
    { name: "Bali", location: "Indonesia", image: baliImg },
    { name: "Barcelona", location: "Spain", image: barcelonaImg },
    { name: "Maldives", location: "Indian Ocean", image: maldivesImg },
    { name: "Swiss Alps", location: "Switzerland", image: swissAlpsImg },
    { name: "Rio de Janeiro", location: "Brazil", image: rioImg }
  ];

  // Third reel destinations (left to right)
  const destinations3 = [
    { name: "Singapore", location: "Singapore", image: singaporeImg },
    { name: "Venice", location: "Italy", image: veniceImg },
    { name: "Cape Town", location: "South Africa", image: capeTownImg },
    { name: "Iceland", location: "Nordic", image: icelandImg },
    { name: "Petra", location: "Jordan", image: petraImg },
    { name: "Great Wall", location: "China", image: greatWallImg },
    { name: "Amsterdam", location: "Netherlands", image: amsterdamImg }
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
    <div className="min-h-screen" ref={animationRef}>
      {/* Header - Clean & Professional Navigation */}
      <header className="border-b border-border/40 bg-background/98 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
          {/* Logo - Prominent & Clickable */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 min-w-fit hover:opacity-80 transition-opacity"
          >
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent block leading-none">Trippy AI</span>
              <span className="text-[10px] text-muted-foreground font-medium">Your Travel Buddy</span>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <div className="w-full relative group">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none group-focus-within:text-travel-sky transition-colors" />
              <Input
                type="text"
                placeholder="Search destinations, packages..."
                className="pl-11 pr-4 py-2.5 rounded-full border border-border/50 bg-muted/20 hover:bg-muted/40 focus:bg-background transition-all text-sm focus:ring-2 focus:ring-travel-sky/30 focus:border-travel-sky/50"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            <a href="#features" className="text-sm text-foreground/80 hover:text-travel-sky transition-colors font-medium relative group">
              <span>Features</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-travel-sky transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#destinations" className="text-sm text-foreground/80 hover:text-travel-ocean transition-colors font-medium relative group">
              <span>Destinations</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-travel-ocean transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#packages" className="text-sm text-foreground/80 hover:text-travel-coral transition-colors font-medium relative group">
              <span>Packages</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-travel-coral transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <div className="h-5 w-px bg-border/50"></div>
            
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs font-medium"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="text-xs font-medium hover:bg-travel-sky/10 hover:text-travel-sky"
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                Login
              </Button>
            )}
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs font-medium px-4" 
              onClick={() => handleStartChat()}
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Start Chat
            </Button>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {!user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="px-2"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            )}
            <Button className="bg-gradient-to-r from-travel-coral to-travel-sunset transition-all duration-300 hover-button" onClick={() => handleStartChat()}>
              Chat Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Hackathon Optimized */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-travel-sky/5 to-travel-ocean/10">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-15"
        >
          <source src="https://video.wixstatic.com/video/3a70c8_3c7fb95ad85f46e2b6461185821989ef/480p/mp4/file.mp4" type="video/mp4" />
        </video>

        {/* Subtle Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.03),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.03),transparent_50%)]"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
          <div className="max-w-5xl mx-auto">
            {/* AI Badge - Prominent for Judges */}
            <div className="flex justify-center mb-6 animate-fade-in">
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-travel-sky/20 to-travel-ocean/20 border border-travel-sky/30 rounded-full px-5 py-2.5 backdrop-blur-sm shadow-lg">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-travel-sky" />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="h-5 w-5 text-travel-sky opacity-20" />
                  </div>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent">
                  AI-POWERED TRAVEL ASSISTANT
                </span>
              </div>
            </div>

            {/* Main Headline - Clear & Impactful */}
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="text-foreground">Your Personal AI</span>
                <span className="block mt-2 bg-gradient-to-r from-travel-sky via-travel-ocean to-travel-coral bg-clip-text text-transparent">
                  Travel Planner
                </span>
              </h1>

              {/* Value Proposition - Concise & Clear */}
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Chat with <span className="font-bold text-travel-coral">Trippy AI</span> to plan your dream vacation in seconds.
                <span className="hidden sm:inline"> Get personalized itineraries, instant bookings, and real-time trip management—all in one place.</span>
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-8 py-6 sm:py-7 bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-2xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
                  onClick={() => handleStartChat()}
                >
                  <MessageSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                  Chat with Trippy AI
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base sm:text-lg px-8 py-6 sm:py-7 border-2 border-travel-sky text-travel-sky hover:bg-travel-sky hover:text-white transition-all duration-300 w-full sm:w-auto"
                  onClick={() => navigate('/booking')}
                >
                  <Plane className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Quick Book
                </Button>
              </div>

              {/* Trust Indicators - Simplified */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-medium text-foreground">100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="font-medium text-foreground">Instant Planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-foreground">150+ Countries</span>
                </div>
              </div>
            </div>

            {/* Stats Section - Cleaner Layout */}
            <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
        </div>
      </section>

      {/* Search Bar Section - NEW */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/10 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      {/* Trending Section - NEW */}
      <TrendingSection />

      {/* Offers Section - NEW */}
      <OffersSection />

      {/* Features Section - Hackathon Ready */}
      <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/5 to-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-20 space-y-5 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-travel-sky/10 to-travel-ocean/10 border border-travel-sky/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-travel-sky" />
              <span className="text-sm font-bold text-travel-sky">AI-POWERED FEATURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              <span className="text-foreground">Everything You Need,</span>
              <span className="block mt-2 bg-gradient-to-r from-travel-sky via-travel-ocean to-travel-coral bg-clip-text text-transparent">
                Nothing You Don't
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trippy AI combines cutting-edge technology with travel expertise to plan your perfect journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border-2 hover:border-travel-sky/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20"
              >
                {/* Feature Content */}
                <div className="p-6 sm:p-7 relative z-10">
                  {/* Icon */}
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-travel-sky transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-travel-sky/0 via-travel-ocean/0 to-travel-sky/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Visual Journey */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-br from-muted/10 via-background to-travel-sky/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-travel-sky rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-travel-ocean rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-20 space-y-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              <span className="text-foreground">From Dream to Reality</span>
              <span className="block mt-2 bg-gradient-to-r from-travel-coral via-travel-sunset to-travel-ocean bg-clip-text text-transparent">
                In Just 4 Steps
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Planning a trip has never been this easy. Watch how Trippy AI transforms your travel dreams
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative group">
                {/* Step Card */}
                <div className="relative bg-gradient-to-br from-background to-muted/30 border-2 border-dashed border-travel-sky/30 rounded-2xl p-6 sm:p-7 hover:border-travel-sky/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number */}
                  <div className="relative mb-5">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full bg-travel-sky/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-travel-sky transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow Connector - Desktop Only */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="relative">
                      <ArrowRight className="h-8 w-8 text-travel-sky/40 group-hover:text-travel-sky transition-colors duration-300" />
                      <ArrowRight className="h-8 w-8 text-travel-sky/20 absolute top-0 left-0 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sample Itinerary Section */}
          <div className="mt-16 md:mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">See Your Trip Come to Life</h3>
              <p className="text-base sm:text-lg text-muted-foreground">Here's what a Trippy itinerary looks like</p>
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

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center gap-5 p-8 sm:p-10 bg-gradient-to-br from-travel-sky/10 to-travel-ocean/10 border border-travel-sky/20 rounded-3xl backdrop-blur-sm">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Ready to Start Your Journey?</h3>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md">Join thousands of happy travelers who trust Trippy AI</p>
              <Button 
                size="lg"
                className="text-base sm:text-lg px-8 py-6 bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                onClick={() => handleStartChat()}
              >
                <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Chat with Trippy Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section - NEW */}
      <PackagesSection />

      {/* Testimonials Section - Replaced with ReviewsSection */}
      <div id="testimonials">
        <ReviewsSection />
      </div>

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
              <div key={i} className="animate-fade-in">
                <DestinationCard 
                  {...destination} 
                  onClick={() => handleDestinationClick(destination)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-xl transition-all duration-300 group hover-button"
              onClick={() => setShowChat(true)}
            >
              <Globe className="mr-2 h-5 w-5 hover-icon" />
              Discover More Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <MapSection />

      {/* Google Maps Section */}
      <GoogleMapComponent />

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
                  className="text-lg bg-white text-travel-sky hover:bg-gray-100 transition-all duration-300 shadow-xl font-semibold hover-button"
                  onClick={() => setShowChat(true)}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Planning Now - It's Free!
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-2 border-white text-white hover:bg-white/10 transition-all duration-300 font-semibold hover-button"
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
                <Button className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg transition-all duration-300 px-6 hover-button">
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
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-travel-sky/20 flex items-center justify-center transition-all duration-300 hover-button">
                  <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-travel-sky transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-travel-coral/20 flex items-center justify-center transition-all duration-300 hover-button">
                  <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-travel-coral transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 hover-button">
                  <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-blue-600/20 flex items-center justify-center transition-all duration-300 hover-button">
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-muted hover:bg-red-500/20 flex items-center justify-center transition-all duration-300 hover-button">
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
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">Made with Love</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Trippy. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Terms</a>
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Cookies</a>
              <a href="#" className="hover:text-travel-sky transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Interface Modal */}
      {showChat && (
        <ChatInterface
          onClose={() => {
            setShowChat(false);
            setInitialDestination(undefined);
          }}
          initialDestination={initialDestination}
        />
      )}

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isDestinationModalOpen}
        onClose={() => setIsDestinationModalOpen(false)}
        onStartPlanning={handleStartPlanningFromModal}
        image={selectedDestination?.image_url}
      />
    </div>
  );
};

export default Index;
