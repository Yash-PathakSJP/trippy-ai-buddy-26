-- Create destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  highlights TEXT[],
  best_time_to_visit TEXT,
  average_cost TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversations table for storing chat history
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved_trips table
CREATE TABLE public.saved_trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations ON DELETE SET NULL,
  destination_name TEXT NOT NULL,
  notes TEXT,
  planned_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_trips ENABLE ROW LEVEL SECURITY;

-- Destinations are publicly readable
CREATE POLICY "Destinations are viewable by everyone" 
ON public.destinations FOR SELECT USING (true);

-- Conversations policies
CREATE POLICY "Users can view their own conversations" 
ON public.conversations FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create conversations" 
ON public.conversations FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own conversations" 
ON public.conversations FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Messages policies
CREATE POLICY "Users can view messages from their conversations" 
ON public.messages FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE conversations.id = messages.conversation_id 
    AND (conversations.user_id = auth.uid() OR conversations.user_id IS NULL)
  )
);

CREATE POLICY "Anyone can create messages" 
ON public.messages FOR INSERT 
WITH CHECK (true);

-- Saved trips policies
CREATE POLICY "Users can view their own saved trips" 
ON public.saved_trips FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved trips" 
ON public.saved_trips FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved trips" 
ON public.saved_trips FOR DELETE 
USING (auth.uid() = user_id);

-- Insert sample destinations
INSERT INTO public.destinations (name, location, description, highlights, best_time_to_visit, average_cost) VALUES
('Paris', 'France', 'The City of Light offers iconic landmarks, world-class cuisine, and romantic charm at every corner.', ARRAY['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Montmartre'], 'April to June, September to November', '$150-300/day'),
('Tokyo', 'Japan', 'A dazzling blend of ultra-modern technology and ancient traditions, Tokyo never fails to amaze.', ARRAY['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Harajuku', 'Tsukiji Market'], 'March to May, September to November', '$100-250/day'),
('Bali', 'Indonesia', 'The Island of Gods beckons with lush rice terraces, ancient temples, and serene beaches.', ARRAY['Ubud Rice Terraces', 'Uluwatu Temple', 'Seminyak Beach', 'Sacred Monkey Forest', 'Mount Batur'], 'April to October', '$50-150/day'),
('New York', 'United States', 'The city that never sleeps offers endless entertainment, culture, and iconic experiences.', ARRAY['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Broadway'], 'April to June, September to November', '$200-400/day'),
('London', 'United Kingdom', 'Historic landmarks meet modern culture in this vibrant, multicultural metropolis.', ARRAY['Big Ben', 'Tower of London', 'British Museum', 'Buckingham Palace', 'Camden Market'], 'May to September', '$150-300/day'),
('Dubai', 'United Arab Emirates', 'A futuristic oasis of luxury, record-breaking architecture, and desert adventures.', ARRAY['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari', 'Gold Souk'], 'November to March', '$200-500/day');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for conversations
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();