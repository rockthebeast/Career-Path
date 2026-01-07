-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for RBAC (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.is_admin(auth.uid()));

-- Scholarships table
CREATE TABLE public.scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    eligibility TEXT,
    category TEXT,
    amount TEXT,
    deadline TIMESTAMP WITH TIME ZONE,
    official_link TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Everyone can view active scholarships
CREATE POLICY "Anyone can view active scholarships"
ON public.scholarships
FOR SELECT
USING (is_active = true);

-- Admins can manage scholarships
CREATE POLICY "Admins can insert scholarships"
ON public.scholarships
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update scholarships"
ON public.scholarships
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete scholarships"
ON public.scholarships
FOR DELETE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all scholarships"
ON public.scholarships
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Scholarship subscriptions
CREATE TABLE public.scholarship_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    scholarship_id UUID REFERENCES public.scholarships(id) ON DELETE CASCADE,
    notify_all BOOLEAN DEFAULT false,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, scholarship_id)
);

ALTER TABLE public.scholarship_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
ON public.scholarship_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions"
ON public.scholarship_subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subscriptions"
ON public.scholarship_subscriptions
FOR DELETE
USING (auth.uid() = user_id);

-- Careers table (for admin management)
CREATE TABLE public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    level TEXT,
    description TEXT,
    salary_range TEXT,
    skills TEXT[],
    official_link TEXT,
    views INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active careers"
ON public.careers
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can insert careers"
ON public.careers
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update careers"
ON public.careers
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete careers"
ON public.careers
FOR DELETE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all careers"
ON public.careers
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Feedback table
CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_message TEXT,
    improvement_suggestions TEXT,
    page_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all feedback"
ON public.feedback
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Quiz results table
CREATE TABLE public.quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    answers JSONB NOT NULL,
    stream TEXT,
    recommended_careers TEXT[],
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz results"
ON public.quiz_results
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can submit their own quiz results"
ON public.quiz_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all quiz results"
ON public.quiz_results
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Contact messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Analytics events table
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    event_data JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT,
    page_url TEXT,
    language TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track events"
ON public.analytics_events
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view analytics"
ON public.analytics_events
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Trigger to auto-assign first user as admin
CREATE OR REPLACE FUNCTION public.assign_first_user_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO user_count FROM public.user_roles;
    
    IF user_count = 0 THEN
        INSERT INTO public.user_roles (user_id, role) VALUES (NEW.user_id, 'admin');
    ELSE
        INSERT INTO public.user_roles (user_id, role) VALUES (NEW.user_id, 'user');
    END IF;
    
    RETURN NEW;
END;
$$;

-- Trigger on profiles to assign role when user signs up
CREATE TRIGGER on_profile_created_assign_role
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.assign_first_user_admin();

-- Update triggers for updated_at columns
CREATE TRIGGER update_scholarships_updated_at
BEFORE UPDATE ON public.scholarships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_careers_updated_at
BEFORE UPDATE ON public.careers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();