import { Card } from "@/components/ui/card";
import SimpleNavbar from "@/components/SimpleNavbar";
import { Sparkles, MessageSquare, MapPin, Calendar, Camera, Users, Globe } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Conversations",
    description:
      "Chat naturally with Trippy in your language. Tell me your dreams, and I'll craft the perfect adventure tailored just for you.",
    gradient: "from-travel-sky to-travel-ocean",
  },
  {
    icon: MapPin,
    title: "Interactive Visual Maps",
    description:
      "Watch your journey unfold on beautiful maps with drag-and-drop pins, routes, and hidden gems only locals know about.",
    gradient: "from-travel-coral to-travel-sunset",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Optimize every moment! I'll balance your time perfectly between must-see attractions and spontaneous discoveries.",
    gradient: "from-travel-ocean to-purple-500",
  },
  {
    icon: Camera,
    title: "Expense Tracking",
    description:
      "Snap photos of receipts, set budgets, and track spending effortlessly. No more vacation budget surprises!",
    gradient: "from-travel-sunset to-red-500",
  },
  {
    icon: Users,
    title: "Collaborative Planning",
    description:
      "Invite friends and family! Plan together in real-time, vote on activities, and build unforgettable group adventures.",
    gradient: "from-green-400 to-travel-sky",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Speak to me in any language! I understand you perfectly and can help you navigate anywhere in the world.",
    gradient: "from-travel-coral to-pink-500",
  },
];

const Features = () => (
  <section className="bg-gradient-to-b from-background via-muted/5 to-background animate-in fade-in slide-in-from-bottom duration-300">
    <SimpleNavbar />
    <div className="py-20 md:py-28">
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
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-travel-sky/0 via-travel-ocean/0 to-travel-sky/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Card>
        ))}
      </div>
    </div>
    </div>
  </section>
);

export default Features;
