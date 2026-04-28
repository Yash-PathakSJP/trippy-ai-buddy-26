import { generateContent } from "./gemini";

/**
 * TripContext stores key details collected from the user for trip planning.
 * Each field is optional and collected intelligently through conversation.
 */
export interface TripContext {
  destination?: string;
  destinations?: string[]; // For multi-city trips
  budget?: {
    min?: number;
    max?: number;
    currency?: string;
    category?: "budget" | "standard" | "luxury"; // Inferred category
  };
  duration?: {
    startDate?: string; // YYYY-MM-DD format
    endDate?: string; // YYYY-MM-DD format
    days?: number;
  };
  travelType?: "solo" | "couple" | "family" | "group" | "friends";
  interests?: string[]; // e.g., "nature", "food", "history", "adventure", "culture", "nightlife"
  season?: string;
  accommodation?: string;
  transportation?: string;
}

/**
 * Analyzes user message to extract trip details and identifies missing information.
 */
export async function extractTripDetails(userMessage: string, currentContext: TripContext): Promise<{
  extractedContext: Partial<TripContext>;
  missingFields: string[];
  confidence: number;
}> {
  const extractionPrompt = `Analyze the user message and extract travel planning details. Return ONLY a JSON object with:
- destination (string or array of strings)
- budget (object with min, max, currency, category)
- duration (object with days, or startDate/endDate in YYYY-MM-DD format)
- travelType (solo|couple|family|group|friends)
- interests (array: nature, food, history, adventure, culture, nightlife, adventure sports, etc.)
- season (string)
- transportMode (string)

Return valid JSON only. Include null for missing fields.

User message: "${userMessage}"
Current context: ${JSON.stringify(currentContext)}

Return JSON:`;

  try {
    const response = await generateContent(extractionPrompt);
    const extracted = JSON.parse(response);
    
    const missingFields = [];
    if (!extracted.destination) missingFields.push("destination");
    if (!extracted.duration?.days && !extracted.duration?.startDate) missingFields.push("duration");
    if (!extracted.budget) missingFields.push("budget");
    if (!extracted.travelType) missingFields.push("travelType");
    if (!extracted.interests || extracted.interests.length === 0) missingFields.push("interests");
    
    return {
      extractedContext: extracted,
      missingFields,
      confidence: Math.max(0, 1 - (missingFields.length / 5))
    };
  } catch (error) {
    console.error("Failed to extract trip details:", error);
    return {
      extractedContext: {},
      missingFields: ["destination", "duration", "budget", "travelType", "interests"],
      confidence: 0
    };
  }
}

/**
 * Generates smart follow-up questions based on missing trip details.
 */
export async function generateFollowUpQuestions(tripContext: TripContext, missingFields: string[]): Promise<string> {
  if (missingFields.length === 0) return "";
  
  const fieldsToAsk = missingFields.slice(0, 2); // Ask max 2 questions at a time
  
  const questionPrompt = `You are Trippy, a friendly travel assistant. Based on what we know:
- Destination: ${tripContext.destination || "(not mentioned)"}
- Duration: ${tripContext.duration?.days ? tripContext.duration.days + " days" : "(not mentioned)"}
- Budget: ${tripContext.budget?.category || "(not mentioned)"}
- Travel type: ${tripContext.travelType || "(not mentioned)"}
- Interests: ${tripContext.interests?.join(", ") || "(not mentioned)"}

Generate 1-2 natural, friendly follow-up questions to learn more about these missing details: ${fieldsToAsk.join(", ")}
Keep questions concise and relevant to their interests. Make them feel like natural conversation, not a survey.`;

  try {
    const response = await generateContent(questionPrompt);
    return response;
  } catch (error) {
    console.error("Failed to generate follow-up questions:", error);
    return getDefaultFollowUpQuestion(missingFields[0]);
  }
}

/**
 * Generates a complete day-wise travel itinerary based on trip context.
 */
export async function generateItinerary(tripContext: TripContext): Promise<string> {
  const itineraryPrompt = `You are Trippy, an expert travel planner. Create a detailed day-wise itinerary.

TRIP DETAILS:
- Destination(s): ${tripContext.destination || tripContext.destinations?.join(", ")}
- Duration: ${tripContext.duration?.days || "Unknown"} days
- Travel Type: ${tripContext.travelType || "Solo"}
- Interests: ${tripContext.interests?.join(", ") || "Mixed"}
- Budget Category: ${tripContext.budget?.category || "Standard"}
- Season/Time: ${tripContext.season || "Any"}

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS:
**Day-wise Itinerary:**

**Day 1: [Title]**
- Morning: [Activity]
- Afternoon: [Activity]
- Evening: [Dining & Experience]

[Continue for all days]

**Accommodation Suggestions:**
- Budget: [Hotel name/type - $X/night]
- Standard: [Hotel name/type - $X/night]
- Luxury: [Hotel name/type - $X/night]

**Local Transport:**
[Recommended transport modes with tips]

**Food & Experiences:**
[Must-try dishes and dining experiences]

**Pro Tips:**
- [Practical tip 1]
- [Practical tip 2]
- [Safety/cost-saving tip]

Make it engaging, specific, and actionable. Use budget-appropriate suggestions.`;

  try {
    const response = await generateContent(itineraryPrompt);
    return response;
  } catch (error) {
    console.error("Failed to generate itinerary:", error);
    return `I'd love to create a detailed itinerary for you! It seems I'm having a moment of inspiration overload. Could you confirm your trip details once more? 🗺️`;
  }
}

/**
 * Generates booking guidance and execution steps.
 */
export async function generateBookingGuidance(tripContext: TripContext, itinerary: string): Promise<string> {
  const bookingPrompt = `Based on this trip plan, provide step-by-step booking guidance:

TRIP: ${tripContext.duration?.days || 1} days in ${tripContext.destination}, budget ${tripContext.budget?.category || "standard"}

KEY ITINERARY HIGHLIGHTS:
${itinerary.substring(0, 500)}...

PROVIDE:
1. **Flight Booking** - Recommended platforms and tips
2. **Hotels** - How to find and book based on your itinerary
3. **Local Activities** - Where to book activities mentioned
4. **Day-of Tips** - Practical execution advice

Format as clear, actionable steps with specific platform recommendations (booking.com, airbnb, skyscanner, viator, etc.)
Keep each section 2-3 lines max. Be encouraging!`;

  try {
    const response = await generateContent(bookingPrompt);
    return response;
  } catch (error) {
    console.error("Failed to generate booking guidance:", error);
    return `Here's how to execute your plan:\n\n1. **Flights**: Check Skyscanner, Google Flights, or Kayak\n2. **Hotels**: Browse Booking.com or Airbnb\n3. **Activities**: Book on Viator or GetYourGuide\n4. **Transport**: Use Uber, local taxis, or public transit\n\nHappy travels! 🎉`;
  }
}

/**
 * Adapts existing plan based on user feedback or changes.
 */
export async function adaptPlan(
  originalContext: TripContext,
  changedField: string,
  newValue: string,
  originalItinerary: string
): Promise<string> {
  const adaptPrompt = `The user changed their ${changedField} to "${newValue}". 
Original trip: ${originalContext.destination}, ${originalContext.duration?.days} days, ${originalContext.budget?.category} budget.

Original itinerary excerpt:
${originalItinerary.substring(0, 300)}...

Generate a BRIEF adaptation (3-4 sentences) explaining:
1. How this change affects the plan
2. What should be adjusted
3. Whether a full re-plan is needed

Be encouraging and proactive. If major changes are needed, suggest specific new elements.`;

  try {
    const response = await generateContent(adaptPrompt);
    return response;
  } catch (error) {
    console.error("Failed to adapt plan:", error);
    return `I've noted the change! Let me know if you'd like me to adjust the itinerary accordingly.`;
  }
}

/**
 * Generates destination recommendations based on user interests.
 */
export async function suggestDestinations(
  interests: string[],
  budget: string,
  tripType: string
): Promise<string> {
  const suggestionPrompt = `Suggest 3-4 ideal destinations based on these preferences:
- Interests: ${interests.join(", ")}
- Budget: ${budget}
- Travel Type: ${tripType}

FORMAT:
**Destination Name**
Climate/Season: [details]
Why it's perfect: [2 reasons matching their interests]
Estimated budget: $[range]
Best season: [month/months]

---

Make suggestions specific and compelling. Appeal to their interests directly.`;

  try {
    const response = await generateContent(suggestionPrompt);
    return response;
  } catch (error) {
    console.error("Failed to suggest destinations:", error);
    return `Based on your interests, I'd recommend destinations like Bali (for adventure & food), Japan (for culture), or Peru (for history & nature). Tell me more about your preferences and I can narrow it down! 🌍`;
  }
}

/**
 * Generates a trip summary for review/modification.
 */
export async function generateTripSummary(tripContext: TripContext): Promise<string> {
  const summaryPrompt = `Create a SHORT, clear trip summary (max 5 lines) of:
Destination: ${tripContext.destination}
Duration: ${tripContext.duration?.days || "Unknown"} days
Travel Type: ${tripContext.travelType}
Interests: ${tripContext.interests?.join(", ")}
Budget: ${tripContext.budget?.category}

Format like:
"📍 You're planning a **[duration]-day [travel type]** trip to **[destination]** focusing on **[interests]** with a **[budget]** budget."

Keep it engaging and scan-friendly!`;

  try {
    const response = await generateContent(summaryPrompt);
    return response;
  } catch (error) {
    console.error("Failed to generate summary:", error);
    return `Your trip: ${tripContext.duration?.days || "Several"} days in ${tripContext.destination} (${tripContext.travelType}, ${tripContext.interests?.join(", ")}, ${tripContext.budget?.category} budget)`;
  }
}

/**
 * Default fallback follow-up question when API fails.
 */
function getDefaultFollowUpQuestion(field: string): string {
  const defaults: Record<string, string> = {
    destination: "Where would you love to explore?",
    duration: "How many days are you planning to spend?",
    budget: "What's your approximate budget for this trip?",
    travelType: "Are you traveling solo, with family, or with friends?",
    interests: "What kind of experiences appeal to you most? (nature, food, culture, adventure, history?)"
  };
  return defaults[field] || "Tell me more about your trip preferences!";
}
