import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel, Users, Calendar as CalendarIcon, MapPin, CreditCard, Shield, Clock, ArrowLeft, Check, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { ChatInterface } from "@/components/ChatInterface";

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const packageInfo = location.state?.package;
  
  const [bookingType, setBookingType] = useState<"flight" | "hotel" | "package">(
    packageInfo ? "package" : "flight"
  );
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState("1");
  const [destination, setDestination] = useState(packageInfo?.destination || "");
  const [origin, setOrigin] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBooking = () => {
    // Booking logic here
    console.log("Booking:", { bookingType, departureDate, returnDate, travelers, destination, origin });
    alert("Booking request submitted! Our team will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-sky/10 via-background to-travel-coral/10">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-travel-sky/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Plane className="h-6 w-6 sm:h-8 sm:w-8 text-travel-coral" />
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-travel-coral to-travel-sunset bg-clip-text text-transparent">
                  Trippy
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-travel-coral to-travel-sunset bg-clip-text text-transparent">
                Book Your Journey
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Complete your booking in a few simple steps. We'll handle the rest!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6 lg:p-8 shadow-xl border-2">
                <Tabs value={bookingType} onValueChange={(v) => setBookingType(v as "flight" | "hotel" | "package")} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
                    <TabsTrigger value="flight" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Flight</span>
                      <span className="sm:hidden">Fly</span>
                    </TabsTrigger>
                    <TabsTrigger value="hotel" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <Hotel className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Hotel</span>
                      <span className="sm:hidden">Stay</span>
                    </TabsTrigger>
                    <TabsTrigger value="package" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Package</span>
                      <span className="sm:hidden">Pack</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Flight Booking */}
                  <TabsContent value="flight" className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from" className="text-xs sm:text-sm">From</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="from"
                            placeholder="Enter departure city"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to" className="text-xs sm:text-sm">To</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="to"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Departure Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={departureDate}
                              onSelect={setDepartureDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Return Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="travelers" className="text-xs sm:text-sm">Number of Travelers</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="travelers"
                            type="number"
                            min="1"
                            value={travelers}
                            onChange={(e) => setTravelers(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class" className="text-xs sm:text-sm">Travel Class</Label>
                        <Select defaultValue="economy">
                          <SelectTrigger id="class">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premium">Premium Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="first">First Class</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Hotel Booking */}
                  <TabsContent value="hotel" className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="hotel-city" className="text-xs sm:text-sm">City / Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="hotel-city"
                          placeholder="Enter city or destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Check-in Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={departureDate}
                              onSelect={setDepartureDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Check-out Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rooms" className="text-xs sm:text-sm">Number of Rooms</Label>
                        <Input id="rooms" type="number" min="1" defaultValue="1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guests" className="text-xs sm:text-sm">Number of Guests</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="guests"
                            type="number"
                            min="1"
                            value={travelers}
                            onChange={(e) => setTravelers(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Package Booking */}
                  <TabsContent value="package" className="space-y-4 sm:space-y-6">
                    {packageInfo && (
                      <Card className="p-4 bg-gradient-to-r from-travel-sky/10 to-travel-ocean/10 border-travel-sky">
                        <div className="flex items-start gap-4">
                          <img 
                            src={packageInfo.image} 
                            alt={packageInfo.destination}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg mb-1">{packageInfo.destination}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">{packageInfo.duration}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">{packageInfo.type}</Badge>
                              <span className="text-lg sm:text-xl font-bold text-travel-coral">${packageInfo.price}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="package-destination" className="text-xs sm:text-sm">Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="package-destination"
                          placeholder="Enter destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={departureDate}
                              onSelect={setDepartureDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-xs sm:text-sm">Duration</Label>
                        <Select defaultValue="5nights">
                          <SelectTrigger id="duration">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3nights">3 Nights / 4 Days</SelectItem>
                            <SelectItem value="5nights">5 Nights / 6 Days</SelectItem>
                            <SelectItem value="7nights">7 Nights / 8 Days</SelectItem>
                            <SelectItem value="10nights">10 Nights / 11 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package-travelers" className="text-xs sm:text-sm">Number of Travelers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="package-travelers"
                          type="number"
                          min="1"
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator className="my-6 sm:my-8" />

                {/* Traveler Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold">Traveler Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs sm:text-sm">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm">Email Address</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-travel-coral to-travel-sunset hover:shadow-xl transition-all duration-300 h-11 sm:h-12 text-sm sm:text-base"
                >
                  <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Proceed to Payment
                </Button>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="p-4 sm:p-6 shadow-xl border-2 sticky top-24">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-travel-coral flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium">Destination</p>
                      <p className="text-muted-foreground truncate">{destination || "Not selected"}</p>
                    </div>
                  </div>
                  
                  {departureDate && (
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarIcon className="h-4 w-4 text-travel-ocean flex-shrink-0" />
                      <div>
                        <p className="font-medium">Dates</p>
                        <p className="text-muted-foreground">
                          {format(departureDate, "MMM dd")}
                          {returnDate && ` - ${format(returnDate, "MMM dd")}`}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-travel-sunset flex-shrink-0" />
                    <div>
                      <p className="font-medium">Travelers</p>
                      <p className="text-muted-foreground">{travelers} {parseInt(travelers) === 1 ? 'Person' : 'People'}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 sm:my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Free cancellation</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>24/7 support</span>
                  </div>
                </div>

                <Separator className="my-4 sm:my-6" />

                <div className="bg-gradient-to-r from-travel-sky/10 to-travel-ocean/10 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-travel-ocean flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Final price will be calculated based on your selections and current availability.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      {isChatOpen && (
        <ChatInterface onClose={() => setIsChatOpen(false)} initialDestination={destination} />
      )}
    </div>
  );
}
