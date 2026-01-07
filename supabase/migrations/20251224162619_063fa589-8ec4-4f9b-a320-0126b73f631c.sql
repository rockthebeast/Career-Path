-- Create a table for favorite careers (separate from favorite courses)
CREATE TABLE public.favorite_careers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  career_id TEXT NOT NULL,
  career_title TEXT NOT NULL,
  career_description TEXT,
  career_category TEXT,
  career_salary TEXT,
  career_skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, career_id)
);

-- Enable Row Level Security
ALTER TABLE public.favorite_careers ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own favorite careers" 
ON public.favorite_careers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite careers" 
ON public.favorite_careers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorite careers" 
ON public.favorite_careers 
FOR DELETE 
USING (auth.uid() = user_id);