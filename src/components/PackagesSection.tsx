import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Users, Plane, Hotel, Utensils, Camera, ArrowRight, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PackageCardProps {
  title: string;
  location: string;
  duration: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  inclusions: string[];
  badge?: string;
}

export function PackageCard({
  title,
  location,
  duration,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  inclusions,
  badge
}: PackageCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const inclusionIcons: Record<string, typeof Plane> = {
    "Flights": Plane,
    "Hotels": Hotel,
    "Meals": Utensils,
    "Sightseeing": Camera
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {badge && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            {badge}
          </Badge>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <Badge className="bg-black/70 backdrop-blur-sm text-white border-0">
            <Calendar className="h-3 w-3 mr-1" />
            {duration}
          </Badge>
          <Badge className="bg-black/70 backdrop-blur-sm text-white border-0">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                <Star className="h-3 w-3 fill-white" />
                {rating}
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {inclusions.map((inclusion) => {
            const Icon = inclusionIcons[inclusion] || Camera;
            return (
              <div key={inclusion} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                <Icon className="h-3 w-3" />
                {inclusion}
              </div>
            );
          })}
        </div>

        <div className="border-t pt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground line-through">
              {originalPrice}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-travel-coral to-travel-sunset bg-clip-text text-transparent">
                {price}
              </span>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={() => navigate('/booking', { 
              state: { 
                package: { 
                  destination: title, 
                  duration, 
                  price, 
                  image, 
                  type: badge || 'Package' 
                } 
              } 
            })}
            className="group-hover:shadow-lg transition-all text-xs sm:text-sm h-8 sm:h-9"
          >
            <span className="hidden sm:inline">Book Now</span>
            <span className="sm:hidden">Book</span>
            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function PackagesSection() {
  const packages = [
    {
      title: "Magical Dubai Experience",
      location: "UAE",
      duration: "5N / 6D",
      price: "₹45,999",
      originalPrice: "₹65,999",
      rating: 4.8,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500",
      inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"],
      badge: "BESTSELLER"
    },
    {
      title: "Romantic Paris Honeymoon",
      location: "France",
      duration: "7N / 8D",
      price: "₹89,999",
      originalPrice: "₹125,000",
      rating: 4.9,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500",
      inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"],
      badge: "ROMANTIC"
    },
    {
      title: "Exotic Bali Adventure",
      location: "Indonesia",
      duration: "6N / 7D",
      price: "₹52,999",
      originalPrice: "₹75,000",
      rating: 4.7,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500",
      inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"]
    },
    {
      title: "Swiss Alps Wonder",
      location: "Switzerland",
      duration: "8N / 9D",
      price: "₹125,999",
      originalPrice: "₹180,000",
      rating: 4.9,
      reviews: 542,
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500",
      inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"],
      badge: "LUXURY"
    },
    {
      title: "Maldives Beach Paradise",
      location: "Maldives",
      duration: "4N / 5D",
      price: "₹68,999",
      originalPrice: "₹95,000",
      rating: 4.8,
      reviews: 923,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500",
      inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"],
      badge: "TRENDING"
    },
    {
      title: "Thailand Complete Tour",
      location: "Thailand",
      duration: "6N / 7D",
      price: "₹42,999",
      originalPrice: "₹60,000",
      rating: 4.6,
      reviews: 1456,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500",
      inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            HOLIDAY PACKAGES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Tour Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked packages with flights, hotels, and experiences included
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 hover:bg-primary hover:text-primary-foreground">
            Explore All Packages
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
