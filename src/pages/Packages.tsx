import { PackagesSection } from "@/components/PackagesSection";
import SimpleNavbar from "@/components/SimpleNavbar";

const Packages = () => (
  <section className="bg-gradient-to-b from-background via-muted/5 to-background animate-in fade-in slide-in-from-bottom duration-300">
    <SimpleNavbar />
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PackagesSection />
    </div>
  </section>
);

export default Packages;
