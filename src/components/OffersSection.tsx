import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Percent, Tag, Gift, Sparkles, ArrowRight } from "lucide-react";

export function OffersSection() {
  const offers = [
    {
      id: 1,
      title: "Flat 25% OFF on Domestic Flights",
      description: "Book now and save big on your next domestic trip",
      code: "FLYNOW25",
      discount: "25% OFF",
      validity: "Valid till Feb 28",
      icon: Percent,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "International Hotels - Up to 40% OFF",
      description: "Luxury stays at unbeatable prices worldwide",
      code: "HOTEL40",
      discount: "40% OFF",
      validity: "Valid till Mar 15",
      icon: Tag,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Honeymoon Special Package",
      description: "Romantic getaways with exclusive perks",
      code: "LOVE2024",
      discount: "₹10,000 OFF",
      validity: "Valid till Apr 30",
      icon: Gift,
      gradient: "from-rose-500 to-red-500"
    },
    {
      id: 4,
      title: "Weekend Getaway Deals",
      description: "Quick escapes starting at just ₹4,999",
      code: "WEEKEND",
      discount: "35% OFF",
      validity: "Valid for all weekends",
      icon: Sparkles,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-travel-coral to-travel-sunset text-white">
            EXCLUSIVE OFFERS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Amazing <span className="bg-gradient-to-r from-travel-coral to-travel-sunset bg-clip-text text-transparent">Deals & Offers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Grab the best deals on flights, hotels, and holiday packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <Card key={offer.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary">
                <div className={`h-2 bg-gradient-to-r ${offer.gradient}`} />
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${offer.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <Badge variant="outline" className={`mb-2 border-2 bg-gradient-to-r ${offer.gradient} text-white border-transparent`}>
                      {offer.discount}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {offer.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-xs text-muted-foreground">Code:</span>
                      <code className="text-sm font-bold bg-background px-2 py-1 rounded">
                        {offer.code}
                      </code>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      {offer.validity}
                    </p>

                    <Button className="w-full group-hover:shadow-lg transition-all">
                      Grab Offer
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
            View All Offers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
