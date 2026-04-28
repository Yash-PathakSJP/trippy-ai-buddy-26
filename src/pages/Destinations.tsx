import { DestinationCard } from "@/components/DestinationCard";
import SimpleNavbar from "@/components/SimpleNavbar";
import londonImg from "@/assets/destinations/london.jpg";
import parisImg from "@/assets/destinations/paris.jpg";
import tajMahalImg from "@/assets/destinations/taj-mahal.jpg";
import tokyoImg from "@/assets/destinations/tokyo.jpg";

const destinations = [
  { name: "London", location: "United Kingdom", image: londonImg, description: "Explore iconic landmarks like Big Ben, Tower Bridge, and the British Museum" },
  { name: "Paris", location: "France", image: parisImg, description: "Experience the romance of the Eiffel Tower, Louvre, and charming cafés" },
  { name: "Taj Mahal", location: "Agra, India", image: tajMahalImg, description: "Marvel at the breathtaking white marble monument to eternal love" },
  { name: "Tokyo", location: "Japan", image: tokyoImg, description: "Immerse yourself in the perfect blend of tradition and innovation" },
];

const Destinations = () => (
  <section className="bg-gradient-to-b from-background via-muted/5 to-background animate-in fade-in slide-in-from-bottom duration-300">
    <SimpleNavbar />
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          <span className="text-foreground">Top </span>
          <span className="bg-gradient-to-r from-travel-ocean to-travel-coral bg-clip-text text-transparent">Destinations</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">Curated favorites to spark your next adventure.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {destinations.map((d) => (
          <DestinationCard key={d.name} name={d.name} location={d.location} image={d.image} description={d.description} onClick={() => {}} />
        ))}
      </div>
    </div>
  </section>
);

export default Destinations;
