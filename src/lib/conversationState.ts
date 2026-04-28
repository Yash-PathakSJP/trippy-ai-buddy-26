import { TripContext } from "./travelPlanner";

/**
 * Tracks the conversation stage and state machine for intelligent chatbot behavior.
 */
export type ConversationStage = 
  | "greeting" 
  | "collecting_details" 
  | "ready_for_planning" 
  | "generating_itinerary" 
  | "itinerary_ready" 
  | "booking_phase" 
  | "completed";

export interface ConversationState {
  stage: ConversationStage;
  tripContext: TripContext;
  missingFields: string[];
  itinerary?: string;
  followUpCount: number;
  lastTripSummary?: string;
}

/**
 * Initializes conversation state.
 */
export function initializeConversationState(initialDestination?: string): ConversationState {
  const tripContext: TripContext = {};
  
  if (initialDestination) {
    tripContext.destination = initialDestination;
  }

  return {
    stage: initialDestination ? "collecting_details" : "greeting",
    tripContext,
    missingFields: initialDestination ? ["duration", "budget", "travelType", "interests"] : ["destination", "duration", "budget", "travelType", "interests"],
    followUpCount: 0
  };
}

/**
 * Determines the next conversation stage based on context.
 */
export function determineNextStage(state: ConversationState): ConversationStage {
  const { missingFields, itinerary } = state;

  // If all critical fields are collected, ready for planning
  if (missingFields.length === 0 && !itinerary) {
    return "ready_for_planning";
  }

  // If itinerary exists, we can move to booking phase
  if (itinerary) {
    return itinerary ? "itinerary_ready" : "generating_itinerary";
  }

  // Still collecting details
  if (missingFields.length > 0) {
    return "collecting_details";
  }

  return state.stage;
}

/**
 * Updates conversation state with new extracted context.
 */
export function updateConversationState(
  state: ConversationState,
  extractedContext: Partial<TripContext>,
  newMissingFields: string[]
): ConversationState {
  const updatedContext = {
    ...state.tripContext,
    ...extractedContext
  };

  return {
    ...state,
    tripContext: updatedContext,
    missingFields: newMissingFields,
    followUpCount: state.followUpCount + 1,
    stage: determineNextStage({ ...state, tripContext: updatedContext, missingFields: newMissingFields })
  };
}

/**
 * Checks if we have enough information to create a plan.
 */
export function isReadyForPlanning(state: ConversationState): boolean {
  const { tripContext } = state;
  
  return !!(
    tripContext.destination &&
    (tripContext.duration?.days || tripContext.duration?.startDate) &&
    (tripContext.budget?.category || tripContext.budget?.min) &&
    tripContext.travelType &&
    tripContext.interests &&
    tripContext.interests.length > 0
  );
}

/**
 * Determines if user is ready to move from itinerary to booking.
 */
export function isReadyForBooking(state: ConversationState): boolean {
  return !!(state.itinerary && state.stage === "itinerary_ready");
}

/**
 * Generates a contextual response message based on conversation stage.
 */
export function getStageContext(state: ConversationState): string {
  switch (state.stage) {
    case "greeting":
      return "Starting fresh conversation - ask for destination first";
    case "collecting_details":
        {
      const missingCount = state.missingFields.length;
      return `Collecting details (${5 - missingCount}/5). Missing: ${state.missingFields.join(", ")}`;
      }
    case "ready_for_planning":
      return "All details collected - ready to generate itinerary";
    case "generating_itinerary":
      return "Currently generating the itinerary";
    case "itinerary_ready":
      return "Itinerary ready - can discuss changes or move to booking";
    case "booking_phase":
      return "Providing booking guidance and next steps";
    case "completed":
      return "Trip planning complete - offering final tips";
    default:
      return "Unknown stage";
  }
}
