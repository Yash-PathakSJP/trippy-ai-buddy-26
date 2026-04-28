import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plane, Train, Hotel, MapPin, Calendar as CalendarIcon, Users, Search, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const navigate = useNavigate();
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState("1");

  const handleFlightSearch = () => {
    if (from && to && departureDate) {
      navigate(`/booking?from=${from}&to=${to}&date=${format(departureDate, "yyyy-MM-dd")}&type=flight`);
    }
  };

  const handleHotelSearch = () => {
    if (from && departureDate) {
      navigate(`/booking?location=${from}&checkin=${format(departureDate, "yyyy-MM-dd")}&type=hotel`);
    }
  };

  const handleHolidaySearch = () => {
    navigate(`/destinations`);
  };

  const handlePackageSearch = () => {
    navigate(`/packages`);
  };

  return (
    <div className="w-full mx-auto -mt-16 sm:-mt-20 md:-mt-24 relative z-20 px-4 sm:px-6">
      <Card className="w-full shadow-2xl border-0 bg-gradient-to-br from-background/95 to-muted/50 backdrop-blur-xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 max-w-2xl sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto rounded-3xl">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 bg-muted/30 p-1.5 sm:p-2 rounded-2xl border border-border/50">
            <TabsTrigger value="flights" className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-travel-sky data-[state=active]:to-travel-ocean data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
              <Plane className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Flights</span>
              <span className="sm:hidden">Fly</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-travel-ocean data-[state=active]:to-travel-sky data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
              <Hotel className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Hotels</span>
              <span className="sm:hidden">Stay</span>
            </TabsTrigger>
            <TabsTrigger value="holidays" className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden md:inline">Holidays</span>
              <span className="md:hidden">Trips</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold py-3 sm:py-4 px-3 sm:px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden md:inline">Packages</span>
              <span className="md:hidden">Tours</span>
            </TabsTrigger>
          </TabsList>

        <TabsContent value="flights" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* From */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">From</label>
              <div className="relative">
                <Plane className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-travel-sky" />
                <Input
                  placeholder="Departure city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-travel-sky focus:ring-2 focus:ring-travel-sky/20 transition-all"
                />
              </div>
            </div>

            {/* To */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-travel-ocean" />
                <Input
                  placeholder="Destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-travel-ocean focus:ring-2 focus:ring-travel-ocean/20 transition-all"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Departure</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-sm sm:text-base h-12 sm:h-14 px-4 rounded-xl border-2 border-border/50 hover:border-travel-sky hover:bg-muted/30 transition-all">
                    <CalendarIcon className="mr-3 h-5 w-5 text-travel-sky flex-shrink-0" />
                    <span className="truncate">{departureDate ? format(departureDate, "MMM dd, yyyy") : "Select date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Return</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-sm sm:text-base h-12 sm:h-14 px-4 rounded-xl border-2 border-border/50 hover:border-travel-ocean hover:bg-muted/30 transition-all">
                    <CalendarIcon className="mr-3 h-5 w-5 text-travel-ocean flex-shrink-0" />
                    <span className="truncate">{returnDate ? format(returnDate, "MMM dd, yyyy") : "Select date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
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

          {/* Travelers & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-6 pt-4">
            <div className="flex-1 space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Travelers</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-travel-sky" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  placeholder="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-travel-sky focus:ring-2 focus:ring-travel-sky/20 transition-all"
                />
              </div>
            </div>
            <Button 
              onClick={handleFlightSearch}
              disabled={!from || !to || !departureDate}
              className="bg-gradient-to-r from-travel-sky to-travel-ocean hover:shadow-xl transition-all duration-300 px-8 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl group disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              Search Flights
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="hotels" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* City */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">City / Hotel</label>
              <div className="relative">
                <Hotel className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-travel-ocean" />
                <Input
                  placeholder="Enter city or hotel name"
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-travel-ocean focus:ring-2 focus:ring-travel-ocean/20 transition-all"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-sm sm:text-base h-12 sm:h-14 px-4 rounded-xl border-2 border-border/50 hover:border-travel-ocean hover:bg-muted/30 transition-all">
                    <CalendarIcon className="mr-3 h-5 w-5 text-travel-ocean flex-shrink-0" />
                    <span className="truncate">{departureDate ? format(departureDate, "MMM dd, yyyy") : "Select date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-sm sm:text-base h-12 sm:h-14 px-4 rounded-xl border-2 border-border/50 hover:border-travel-ocean hover:bg-muted/30 transition-all">
                    <CalendarIcon className="mr-3 h-5 w-5 text-travel-ocean flex-shrink-0" />
                    <span className="truncate">{returnDate ? format(returnDate, "MMM dd, yyyy") : "Select date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
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

          {/* Guests & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-6 pt-4">
            <div className="flex-1 space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Guests & Rooms</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-travel-ocean" />
                <Input
                  placeholder="1 Room, 2 Guests"
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-travel-ocean focus:ring-2 focus:ring-travel-ocean/20 transition-all"
                />
              </div>
            </div>
            <Button 
              onClick={handleHotelSearch}
              disabled={!from || !departureDate}
              className="bg-gradient-to-r from-travel-ocean to-travel-sky hover:shadow-xl transition-all duration-300 px-8 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl group disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              Search Hotels
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="holidays" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Destination */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                <Input
                  placeholder="Where do you want to go?"
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Month */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Month</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal text-sm sm:text-base h-12 sm:h-14 px-4 rounded-xl border-2 border-border/50 hover:border-purple-500 hover:bg-muted/30 transition-all">
                    <CalendarIcon className="mr-3 h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="truncate">{departureDate ? format(departureDate, "MMM yyyy") : "Select month"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Duration */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Duration</label>
              <Input 
                placeholder="e.g., 5 nights" 
                className="text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleHolidaySearch}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl transition-all duration-300 px-8 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl group w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              Explore Holiday Packages
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="packages" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* From City */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">From City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                <Input
                  placeholder="Your departure city"
                  className="pl-12 text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>

            {/* Package Type */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-bold text-foreground">Package Type</label>
              <Input 
                placeholder="e.g., Honeymoon, Family, Adventure"
                className="text-sm sm:text-base h-12 sm:h-14 rounded-xl border-2 border-border/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handlePackageSearch}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl transition-all duration-300 px-8 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl group w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
              View All Packages
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
    </div>
  );
}
