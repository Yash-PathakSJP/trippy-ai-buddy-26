import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plane, Hotel, MapPin, Calendar as CalendarIcon, Users, Search } from "lucide-react";
import { format } from "date-fns";

export function SearchBar() {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState("1");

  return (
    <Card className="w-full mx-auto shadow-2xl border-2 bg-card/95 backdrop-blur-sm px-4 py-4 sm:px-6 sm:py-6 max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl">
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 mb-4 sm:mb-6 bg-muted/50">
          <TabsTrigger value="flights" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Plane className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Flights</span>
            <span className="sm:hidden">Fly</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Hotel className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Hotels</span>
            <span className="sm:hidden">Stay</span>
          </TabsTrigger>
          <TabsTrigger value="holidays" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden md:inline">Holidays</span>
            <span className="md:hidden">Trips</span>
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden md:inline">Packages</span>
            <span className="md:hidden">Tours</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">From</label>
              <div className="relative">
                <Plane className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Delhi"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">To</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Mumbai"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Departure</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10 px-2.5 sm:px-3">
                    <CalendarIcon className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{departureDate ? format(departureDate, "MMM dd") : "Pick date"}</span>
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

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Return</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10 px-2.5 sm:px-3">
                    <CalendarIcon className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{returnDate ? format(returnDate, "MMM dd") : "Pick date"}</span>
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-3">
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Travelers</label>
              <div className="relative">
                <Users className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-travel-coral to-travel-sunset hover:shadow-xl transition-all duration-300 px-4 sm:px-8 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto">
              <Search className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Search Flights</span>
              <span className="sm:hidden">Search</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="hotels" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">City / Hotel</label>
              <div className="relative">
                <Hotel className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter city or hotel name"
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10 px-2.5 sm:px-3">
                    <CalendarIcon className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{departureDate ? format(departureDate, "MMM dd") : "Pick date"}</span>
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

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10 px-2.5 sm:px-3">
                    <CalendarIcon className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{returnDate ? format(returnDate, "MMM dd") : "Pick date"}</span>
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 sm:gap-3">
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Guests & Rooms</label>
              <div className="relative">
                <Users className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="1 Room, 2 Guests"
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-travel-ocean to-travel-sky hover:shadow-xl transition-all duration-300 px-4 sm:px-8 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto">
              <Search className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Search Hotels</span>
              <span className="sm:hidden">Search</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="holidays" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Where do you want to go?"
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Month</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10 px-2.5 sm:px-3">
                    <CalendarIcon className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Month</span>
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

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Duration</label>
              <Input placeholder="5 Nights / 6 Days" className="text-xs sm:text-sm h-9 sm:h-10" />
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl transition-all duration-300 h-9 sm:h-10 text-xs sm:text-sm">
            <Search className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Explore Holiday Packages</span>
            <span className="sm:hidden">Holidays</span>
          </Button>
        </TabsContent>

        <TabsContent value="packages" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">From City</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Your city"
                  className="pl-9 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">Package Type</label>
              <Input placeholder="Honeymoon, Family, Adventure..." className="text-xs sm:text-sm h-9 sm:h-10" />
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl transition-all duration-300 h-9 sm:h-10 text-xs sm:text-sm">
            <Search className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">View All Packages</span>
            <span className="sm:hidden">Packages</span>
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
