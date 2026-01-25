import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star, MapPin, ArrowRight, Flame } from "lucide-react";
import { useState } from "react";

interface TrendingDestinationProps {
  name: string;
  country: string;
  image: string;
  price: string;
  rating: number;
  trending: string;
  discount?: string;
}

function TrendingCard({
  name,
  country,
  image,
  price,
  rating,
  trending,
  discount
}: TrendingDestinationProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {discount && (
          <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0 animate-pulse">
            {discount} OFF
          </Badge>
        )}

        <div className="absolute top-3 left-3">
          <Badge className="bg-orange-500 text-white border-0 flex items-center gap-1">
            <Flame className="h-3 w-3" />
            {trending}
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium">{country}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                <Star className="h-3 w-3 fill-white" />
                {rating}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs">Starting from</p>
              <p className="text-white text-xl font-bold">{price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg transition-all">
          Explore Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

export function TrendingSection() {
  const trendingDestinations = [
    {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
      price: "₹35,999",
      rating: 4.8,
      trending: "🔥 Hot This Week",
      discount: "30%"
    },
    {
      name: "Dubai",
      country: "UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
      price: "₹42,999",
      rating: 4.9,
      trending: "📈 Most Booked"
    },
    {
      name: "Maldives",
      country: "Indian Ocean",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
      price: "₹55,999",
      rating: 4.9,
      trending: "💎 Luxury Pick",
      discount: "25%"
    },
    {
      name: "Thailand",
      country: "Southeast Asia",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600",
      price: "₹32,999",
      rating: 4.7,
      trending: "⭐ Best Value"
    },
    {
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
      price: "₹78,999",
      rating: 4.9,
      trending: "❤️ Romantic"
    },
    {
      name: "Switzerland",
      country: "Europe",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600",
      price: "₹95,999",
      rating: 4.8,
      trending: "🏔️ Adventure",
      discount: "20%"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                TRENDING NOW
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Hot Destinations
              </span> This Season
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Most popular destinations booked by travelers this week
            </p>
          </div>

          <Button variant="outline" size="lg" className="hidden md:flex border-2 hover:bg-primary hover:text-primary-foreground">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingDestinations.map((destination, index) => (
            <TrendingCard key={index} {...destination} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
            View All Trending
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-2xl font-bold">2,500+</div>
            <div className="text-sm text-muted-foreground">Bookings Today</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <div className="text-4xl mb-2">✈️</div>
            <div className="text-2xl font-bold">850+</div>
            <div className="text-sm text-muted-foreground">Flights Daily</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <div className="text-4xl mb-2">🏨</div>
            <div className="text-2xl font-bold">1,200+</div>
            <div className="text-sm text-muted-foreground">Hotels Listed</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold">4.9/5</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
