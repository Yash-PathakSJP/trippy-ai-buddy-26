import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, Verified } from "lucide-react";

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  avatar?: string;
  verified?: boolean;
  helpful?: number;
  tripType?: string;
}

export function ReviewCard({
  name,
  location,
  rating,
  date,
  review,
  avatar,
  verified = false,
  helpful = 0,
  tripType
}: ReviewCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-r from-travel-sky to-travel-ocean text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{name}</h4>
                {verified && (
                  <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                    <Verified className="h-3 w-3 mr-1 fill-green-500" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>

          {tripType && (
            <Badge variant="secondary" className="mb-3 text-xs">
              {tripType}
            </Badge>
          )}

          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {review}
          </p>

          <div className="flex items-center gap-2 pt-3 border-t">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="h-4 w-4" />
              Helpful ({helpful})
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ReviewsSection() {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      date: "2 days ago",
      review: "Absolutely wonderful experience! Trippy planned every detail perfectly. The hotels were amazing and the itinerary was spot on. Highly recommend for anyone planning their next vacation!",
      verified: true,
      helpful: 24,
      tripType: "Family Trip"
    },
    {
      name: "John Smith",
      location: "New York, USA",
      rating: 5,
      date: "1 week ago",
      review: "Best travel planning service I've ever used. The AI recommendations were incredibly accurate and saved us so much time. The local experiences suggested were authentic and memorable.",
      verified: true,
      helpful: 18,
      tripType: "Solo Travel"
    },
    {
      name: "Aisha Khan",
      location: "Dubai, UAE",
      rating: 4,
      date: "2 weeks ago",
      review: "Great service overall! The package was well-organized and value for money. The only minor issue was a slight delay in customer support response, but they made up for it with excellent on-ground assistance.",
      verified: true,
      helpful: 12,
      tripType: "Honeymoon"
    },
    {
      name: "David Martinez",
      location: "Barcelona, Spain",
      rating: 5,
      date: "3 weeks ago",
      review: "Trippy made our group trip seamless! Coordinating 8 people across different cities seemed impossible, but the collaborative features made it easy. Everyone loved their experience!",
      verified: true,
      helpful: 31,
      tripType: "Group Trip"
    },
    {
      name: "Sakura Tanaka",
      location: "Tokyo, Japan",
      rating: 5,
      date: "1 month ago",
      review: "素晴らしいサービス！The multilingual support was fantastic. Being able to plan in Japanese made everything so comfortable. Will definitely use again for our next international trip!",
      verified: true,
      helpful: 15,
      tripType: "Business & Leisure"
    },
    {
      name: "Emma Wilson",
      location: "London, UK",
      rating: 5,
      date: "1 month ago",
      review: "Incredible attention to detail! Every restaurant recommendation was perfect, and the suggested hidden gems were absolutely worth visiting. This is now my go-to travel planner!",
      verified: true,
      helpful: 27,
      tripType: "Adventure Trip"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "50,000+", label: "Total Reviews" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "45,000+", label: "Happy Travelers" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            TRAVELER REVIEWS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Travelers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences from real travelers who trust Trippy
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join thousands of happy travelers worldwide
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-sm">🇮🇳 India</Badge>
            <Badge variant="secondary" className="text-sm">🇺🇸 USA</Badge>
            <Badge variant="secondary" className="text-sm">🇬🇧 UK</Badge>
            <Badge variant="secondary" className="text-sm">🇦🇪 UAE</Badge>
            <Badge variant="secondary" className="text-sm">🇯🇵 Japan</Badge>
            <Badge variant="secondary" className="text-sm">+150 more</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
