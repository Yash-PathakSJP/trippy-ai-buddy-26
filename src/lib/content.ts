/**
 * Centralized content module for static marketing data.
 * This eliminates duplication across landing page and feature pages.
 */

import londonImg from "@/assets/destinations/london.jpg";
import parisImg from "@/assets/destinations/paris.jpg";
import tajMahalImg from "@/assets/destinations/taj-mahal.jpg";
import newYorkImg from "@/assets/destinations/new-york.jpg";
import tokyoImg from "@/assets/destinations/tokyo.jpg";
import egyptImg from "@/assets/destinations/egypt.jpg";
import dubaiImg from "@/assets/destinations/dubai.jpg";
import sydneyImg from "@/assets/destinations/sydney.jpg";
import romeImg from "@/assets/destinations/rome.jpg";
import santoriniImg from "@/assets/destinations/santorini.jpg";
import machuPicchuImg from "@/assets/destinations/machu-picchu.jpg";
import baliImg from "@/assets/destinations/bali.jpg";
import barcelonaImg from "@/assets/destinations/barcelona.jpg";
import maldivesImg from "@/assets/destinations/maldives.jpg";
import swissAlpsImg from "@/assets/destinations/swiss-alps.jpg";
import rioImg from "@/assets/destinations/rio.jpg";
import singaporeImg from "@/assets/destinations/singapore.jpg";
import veniceImg from "@/assets/destinations/venice.jpg";
import capeTownImg from "@/assets/destinations/cape-town.jpg";
import icelandImg from "@/assets/destinations/iceland.jpg";
import petraImg from "@/assets/destinations/petra.jpg";
import greatWallImg from "@/assets/destinations/great-wall.jpg";
import amsterdamImg from "@/assets/destinations/amsterdam.jpg";
import {
  MessageSquare,
  MapPin,
  Calendar,
  Camera,
  Users,
  Globe,
} from "lucide-react";

export const FEATURES = [
  {
    icon: MessageSquare,
    title: "AI-Powered Conversations",
    description:
      "Chat naturally with Trippy in your language. Tell me your dreams, and I'll craft the perfect adventure tailored just for you.",
    gradient: "from-travel-sky to-travel-ocean",
  },
  {
    icon: MapPin,
    title: "Interactive Visual Maps",
    description:
      "Watch your journey unfold on beautiful maps with drag-and-drop pins, routes, and hidden gems only locals know about.",
    gradient: "from-travel-coral to-travel-sunset",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Optimize every moment! I'll balance your time perfectly between must-see attractions and spontaneous discoveries.",
    gradient: "from-travel-ocean to-purple-500",
  },
  {
    icon: Camera,
    title: "Expense Tracking",
    description:
      "Snap photos of receipts, set budgets, and track spending effortlessly. No more vacation budget surprises!",
    gradient: "from-travel-sunset to-red-500",
  },
  {
    icon: Users,
    title: "Collaborative Planning",
    description:
      "Invite friends and family! Plan together in real-time, vote on activities, and build unforgettable group adventures.",
    gradient: "from-green-400 to-travel-sky",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Speak to me in any language! I understand you perfectly and can help you navigate anywhere in the world.",
    gradient: "from-travel-coral to-pink-500",
  },
];

export const STATS = [
  { number: "10,000+", label: "Happy Travelers" },
  { number: "150+", label: "Countries Covered" },
  { number: "50,000+", label: "Trips Planned" },
  { number: "4.9★", label: "User Rating" },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    location: "San Francisco, USA",
    text: "Trippy made planning my 3-week European adventure so easy! The AI knew exactly what I wanted before I even finished asking. Absolutely magical!",
    rating: 5,
    initials: "SC",
  },
  {
    name: "Marco Rodriguez",
    location: "Barcelona, Spain",
    text: "I've used many travel planners, but Trippy is different. It feels like having a knowledgeable friend who genuinely cares about your experience.",
    rating: 5,
    initials: "MR",
  },
  {
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    text: "The multilingual support is incredible! Trippy helped me plan a trip to Italy even though I only speak Japanese. Game changer!",
    rating: 5,
    initials: "YT",
  },
];

export const DESTINATIONS_REEL_1 = [
  {
    name: "London",
    location: "United Kingdom",
    image: londonImg,
    description: "Explore iconic landmarks like Big Ben, Tower Bridge, and the British Museum",
  },
  {
    name: "Paris",
    location: "France",
    image: parisImg,
    description: "Experience the romance of the Eiffel Tower, Louvre, and charming cafés",
  },
  {
    name: "Taj Mahal",
    location: "Agra, India",
    image: tajMahalImg,
    description: "Marvel at the breathtaking white marble monument to eternal love",
  },
  {
    name: "New York",
    location: "United States",
    image: newYorkImg,
    description: "Discover the Statue of Liberty, Times Square, and endless possibilities",
  },
  {
    name: "Tokyo",
    location: "Japan",
    image: tokyoImg,
    description: "Immerse yourself in the perfect blend of tradition and innovation",
  },
  {
    name: "Pyramids of Giza",
    location: "Egypt",
    image: egyptImg,
    description: "Witness the ancient wonders and mysteries of the pharaohs",
  },
  {
    name: "Dubai",
    location: "United Arab Emirates",
    image: dubaiImg,
    description: "Experience luxury at Burj Khalifa and futuristic architecture",
  },
  {
    name: "Sydney",
    location: "Australia",
    image: sydneyImg,
    description: "Enjoy the Opera House, Harbour Bridge, and stunning beaches",
  },
];

export const DESTINATIONS_REEL_2 = [
  { name: "Rome", location: "Italy", image: romeImg },
  { name: "Santorini", location: "Greece", image: santoriniImg },
  { name: "Machu Picchu", location: "Peru", image: machuPicchuImg },
  { name: "Bali", location: "Indonesia", image: baliImg },
  { name: "Barcelona", location: "Spain", image: barcelonaImg },
  { name: "Maldives", location: "Indian Ocean", image: maldivesImg },
  { name: "Swiss Alps", location: "Switzerland", image: swissAlpsImg },
  { name: "Rio de Janeiro", location: "Brazil", image: rioImg },
];

export const DESTINATIONS_REEL_3 = [
  { name: "Singapore", location: "Singapore", image: singaporeImg },
  { name: "Venice", location: "Italy", image: veniceImg },
  { name: "Cape Town", location: "South Africa", image: capeTownImg },
  { name: "Iceland", location: "Nordic", image: icelandImg },
  { name: "Petra", location: "Jordan", image: petraImg },
  { name: "Great Wall", location: "China", image: greatWallImg },
  { name: "Amsterdam", location: "Netherlands", image: amsterdamImg },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Tell Me Your Dreams",
    description:
      "Share where you want to go, when, and what excites you most about travel",
  },
  {
    step: 2,
    title: "Watch Magic Happen",
    description:
      "I'll create a personalized itinerary with flights, hotels, and amazing experiences",
  },
  {
    step: 3,
    title: "Customize & Perfect",
    description: "Drag, drop, and adjust everything until it's exactly what you want",
  },
  {
    step: 4,
    title: "Explore with Confidence",
    description:
      "Take your polished plan and create memories that last forever",
  },
];

export const PACKAGES = [
  {
    id: 1,
    destination: "Paris, France",
    type: "Romantic Getaway",
    duration: "5 Days",
    price: 1299,
    image: parisImg,
    description: "Experience the city of love with curated experiences",
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    type: "Cultural Experience",
    duration: "7 Days",
    price: 1599,
    image: tokyoImg,
    description: "Immerse yourself in Japanese traditions and modernity",
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    type: "Beach & Wellness",
    duration: "6 Days",
    price: 899,
    image: baliImg,
    description: "Relax and rejuvenate in a tropical paradise",
  },
  {
    id: 4,
    destination: "Swiss Alps",
    type: "Adventure",
    duration: "8 Days",
    price: 1899,
    image: swissAlpsImg,
    description: "Adventure and mountain scenery await you",
  },
];
