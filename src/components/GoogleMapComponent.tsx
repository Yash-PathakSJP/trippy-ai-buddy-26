import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertCircle } from 'lucide-react';

interface Destination {
  name: string;
  city: string;
  lat: number;
  lng: number;
  description: string;
}

// Type for Google Maps
interface GoogleMapsWindow extends Window {
  google: {
    maps: {
      Map: new (element: HTMLDivElement, options: unknown) => GoogleMap;
      Marker: new (options: unknown) => Marker;
      InfoWindow: new (options: unknown) => InfoWindow;
      SymbolPath: { CIRCLE: number };
    };
  };
}

interface GoogleMap {
  [key: string]: unknown;
}

interface Marker {
  addListener: (event: string, handler: () => void) => void;
  [key: string]: unknown;
}

interface InfoWindow {
  open: (map: GoogleMap, marker: Marker) => void;
  close: () => void;
}

// India and nearby cities travel destinations
const destinations: Destination[] = [
  { name: 'Delhi', city: 'India', lat: 28.7041, lng: 77.1025, description: 'Capital City' },
  { name: 'Mumbai', city: 'India', lat: 19.0760, lng: 72.8777, description: 'Financial Hub' },
  { name: 'Bangalore', city: 'India', lat: 12.9716, lng: 77.5946, description: 'IT Capital' },
  { name: 'Jaipur', city: 'India', lat: 26.9124, lng: 75.7873, description: 'Pink City' },
  { name: 'Goa', city: 'India', lat: 15.2993, lng: 73.8243, description: 'Beach Paradise' },
  { name: 'Kathmandu', city: 'Nepal', lat: 27.7172, lng: 85.3240, description: 'Mountain City' },
  { name: 'Colombo', city: 'Sri Lanka', lat: 6.9271, lng: 80.7789, description: 'Island Capital' },
  { name: 'Male', city: 'Maldives', lat: 4.1755, lng: 73.5093, description: 'Tropical Getaway' },
];

export const GoogleMapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = (element: HTMLDivElement | null) => {
    if (!element || mapLoaded || error) return;

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        setError('Google Maps API key not configured');
        return;
      }

      const googleMapsWindow = window as unknown as GoogleMapsWindow;
      
      // Create map
      const map = new googleMapsWindow.google.maps.Map(element, {
        zoom: 5,
        center: { lat: 20.5937, lng: 78.9629 }, // Center on India
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#616161' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f3f3f3' }],
          },
        ],
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
      });

      // Add markers for each destination
      destinations.forEach((destination) => {
        const marker = new googleMapsWindow.google.maps.Marker({
          position: { lat: destination.lat, lng: destination.lng },
          map: map,
          title: destination.name,
          icon: {
            path: googleMapsWindow.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#0ea5e9',
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Info window for each marker
        const infoWindow = new googleMapsWindow.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; font-family: system-ui; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; color: #0ea5e9; font-weight: 600;">${destination.name}</h3>
              <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">${destination.city}</p>
              <p style="margin: 0; color: #999; font-size: 12px;">${destination.description}</p>
            </div>
          `,
        });

        // Show info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Show info window on hover (mobile-friendly alternative)
        marker.addListener('mouseover', () => {
          infoWindow.open(map, marker);
        });

        marker.addListener('mouseout', () => {
          infoWindow.close();
        });
      });

      setMapLoaded(true);
    } catch (err) {
      console.error('Map loading error:', err);
      setError('Failed to load map');
    }
  };

  // Load Google Maps script
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError('Google Maps API key not configured');
      return;
    }

    // Check if script already loaded
    const googleMapsWindow = window as unknown as Partial<GoogleMapsWindow>;
    if (googleMapsWindow.google?.maps) {
      setMapLoaded(false); // Trigger map creation
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setMapLoaded(false); // Trigger map creation in ref callback
    };

    script.onerror = () => {
      setError('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup (optional)
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-background via-travel-sky/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-block">
            <Badge className="bg-gradient-to-r from-travel-sky to-travel-ocean text-white px-4 py-2 text-sm font-semibold">
              <MapPin className="h-3 w-3 mr-2 inline" />
              India & Nearby Destinations
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Explore India & South Asia
            <span className="block bg-gradient-to-r from-travel-sky to-travel-ocean bg-clip-text text-transparent mt-2">
              Top Travel Destinations
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Click on any destination marker to explore. Discover the most popular cities in India, Nepal, Sri Lanka, and Maldives.
          </p>
        </div>

        {/* Map Container */}
        <Card className="overflow-hidden border-2 border-travel-sky/20 shadow-xl">
          {error ? (
            <div className="w-full h-96 md:h-[500px] bg-muted/50 flex flex-col items-center justify-center gap-4 p-8">
              <AlertCircle className="h-12 w-12 text-travel-coral" />
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Unable to Load Map</h3>
                <p className="text-muted-foreground text-sm">{error}</p>
                <p className="text-muted-foreground text-xs mt-3">
                  Make sure VITE_GOOGLE_MAPS_API_KEY is configured in .env
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={mapRef}
              className="w-full h-96 md:h-[500px] bg-gradient-to-br from-muted/30 to-muted/10"
            />
          )}
        </Card>

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          <p>
            Showing 8 popular travel destinations across India and South Asia. Click on markers to see destination details.
            Use scroll to zoom, drag to pan.
          </p>
        </div>
      </div>
    </section>
  );
};
