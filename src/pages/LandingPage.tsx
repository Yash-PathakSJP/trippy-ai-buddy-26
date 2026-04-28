import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, MessageSquare, MapPin, Calendar, Camera, Users, Globe, Shield, Zap, ArrowRight, Sparkles, Instagram, Twitter, Facebook, Linkedin, Youtube, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Conversations",
      description: "Chat naturally with Trippy. Tell me your dreams, and I'll craft the perfect adventure tailored for you.",
      gradient: "from-travel-sky to-travel-ocean"
    },
    {
      icon: MapPin,
      title: "Interactive Visual Maps",
      description: "Watch your journey unfold on beautiful maps with drag-and-drop pins, routes, and hidden gems.",
      gradient: "from-travel-coral to-travel-sunset"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimize every moment! Perfect balance between must-see attractions and spontaneous discoveries.",
      gradient: "from-travel-ocean to-purple-500"
    },
    {
      icon: Camera,
      title: "Expense Tracking",
      description: "Snap photos of receipts, set budgets, and track spending effortlessly.",
      gradient: "from-travel-sunset to-red-500"
    },
    {
      icon: Users,
      title: "Collaborative Planning",
      description: "Invite friends and family! Plan together in real-time and build unforgettable group adventures.",
      gradient: "from-green-400 to-travel-sky"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Speak in any language! I understand you perfectly and can help navigate anywhere in the world.",
      gradient: "from-travel-coral to-pink-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "150+", label: "Countries Covered" },
    { number: "50,000+", label: "Trips Planned" },
    { number: "4.9★", label: "User Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "San Francisco, USA",
      text: "Trippy made planning my 3-week European adventure so easy! The AI knew exactly what I wanted.",
      rating: 5,
      initials: "SC"
    },
    {
      name: "Marco Rodriguez",
      location: "Barcelona, Spain",
      text: "I've used many travel planners, but Trippy is different. It feels like having a knowledgeable friend.",
      rating: 5,
      initials: "MR"
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      text: "The multilingual support is incredible! Helped me plan a trip to Italy even though I only speak Japanese.",
      rating: 5,
      initials: "YT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-travel-sky/5 to-travel-ocean/10">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/98 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-travel-sky transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-travel-ocean transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium text-foreground/80 hover:text-travel-coral transition-colors">Reviews</a>
            <div className="h-5 w-px bg-border/50"></div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/auth")}
              className="text-xs font-medium hover:bg-travel-sky/10 hover:text-travel-sky"
            >
              Sign In
            </Button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => navigate("/auth")}
              className="text-xs"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.03),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.03),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* AI Badge */}
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

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="text-foreground">Your Personal AI</span>
                <span className="block mt-3 bg-gradient-to-r from-travel-sky via-travel-ocean to-travel-coral bg-clip-text text-transparent">
                  Travel Planner
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Chat with <span className="font-bold text-travel-coral">Trippy AI</span> to plan your dream vacation in seconds.
                <span className="hidden sm:inline"> Get personalized itineraries, instant bookings, and real-time trip management—all in one place.</span>
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-8 py-6 bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-2xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
                onClick={() => navigate("/auth")}
              >
                <MessageSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                Start Planning Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base sm:text-lg px-8 py-6 border-2 border-travel-sky text-travel-sky hover:bg-travel-sky hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                <Plane className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-6 text-sm">
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

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/5 to-background">
        <div className="container mx-auto px-4">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border-2 hover:border-travel-sky/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20"
              >
                <div className="p-6 sm:p-7 relative z-10">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-travel-sky transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-br from-muted/10 via-background to-travel-sky/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 md:mb-20 space-y-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              <span className="text-foreground">From Dream to Reality</span>
              <span className="block mt-2 bg-gradient-to-r from-travel-coral via-travel-sunset to-travel-ocean bg-clip-text text-transparent">
                In Just 4 Steps
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: 1, title: "Tell Your Dreams", description: "Share where you want to go and what excites you" },
              { step: 2, title: "Watch Magic Happen", description: "I'll create a personalized itinerary for you" },
              { step: 3, title: "Customize & Perfect", description: "Drag, drop, and adjust until it's perfect" },
              { step: 4, title: "Explore with Confidence", description: "Take your plan and create unforgettable memories" }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="relative bg-gradient-to-br from-background to-muted/30 border-2 border-dashed border-travel-sky/30 rounded-2xl p-6 sm:p-7 hover:border-travel-sky/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="relative mb-5">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-travel-sky transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 md:mb-20 space-y-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
              <span className="text-foreground">What Travelers Say</span>
              <span className="block mt-2 bg-gradient-to-r from-travel-sky via-travel-ocean to-travel-coral bg-clip-text text-transparent">
                Loved by 10,000+ Happy Travelers
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-6 border-2 hover:border-travel-sky/40 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-travel-sky via-travel-ocean to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <div className="inline-block">
              <Sparkles className="h-16 w-16 mx-auto animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Let Trippy transform your travel dreams into reality. Your perfect itinerary is just a conversation away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg bg-white text-travel-sky hover:bg-gray-100 transition-all duration-300 shadow-xl font-semibold"
                onClick={() => navigate("/auth")}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Planning Now - It's Free!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Get Travel Tips & Inspiration
            </h3>
            <p className="text-muted-foreground">
              Subscribe for exclusive destination guides, travel deals, and insider tips
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-travel-sky/50 transition-all"
              />
              <Button className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-lg transition-all duration-300">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-gradient-to-b from-muted/30 via-muted/50 to-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center shadow-lg">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent">Trippy</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Your AI travel companion for unforgettable journeys.</p>
              <div className="flex gap-2">
                <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-travel-sky/20 flex items-center justify-center transition-all">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-travel-coral/20 flex items-center justify-center transition-all">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-blue-500/20 flex items-center justify-center transition-all">
                  <Facebook className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-travel-sky transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-travel-sky transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-travel-sky transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-travel-sky transition-colors">About</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-travel-sky transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-travel-sky transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Trippy AI. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
