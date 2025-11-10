import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

interface Activity {
  time: string;
  name: string;
  location: string;
}

interface ItineraryCardProps {
  day: number;
  title: string;
  activities: Activity[];
}

export const ItineraryCard = ({ day, title, activities }: ItineraryCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-l-4 border-l-primary">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge className="mb-2 bg-gradient-sky">Day {day}</Badge>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-4 p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
            <div className="flex-shrink-0 w-16 text-center">
              <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium text-foreground">{activity.time}</p>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{activity.name}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{activity.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
