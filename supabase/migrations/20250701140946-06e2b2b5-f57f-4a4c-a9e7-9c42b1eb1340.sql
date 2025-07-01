-- Create subjects table for school students
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT, -- science, commerce, arts, etc.
  education_type TEXT NOT NULL DEFAULT 'school',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_subjects junction table to store user's selected subjects
CREATE TABLE public.user_subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject_id)
);

-- Enable RLS on both tables
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subjects ENABLE ROW LEVEL SECURITY;

-- Create policies for subjects (readable by all authenticated users)
CREATE POLICY "Subjects are viewable by all authenticated users" 
ON public.subjects 
FOR SELECT 
TO authenticated
USING (true);

-- Create policies for user_subjects
CREATE POLICY "Users can view their own subjects" 
ON public.user_subjects 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subjects" 
ON public.user_subjects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subjects" 
ON public.user_subjects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add tutoring permissions to profiles table
ALTER TABLE public.profiles 
ADD COLUMN can_tutor BOOLEAN DEFAULT false,
ADD COLUMN can_take_paid_jobs BOOLEAN DEFAULT true,
ADD COLUMN can_post_paid_jobs BOOLEAN DEFAULT true;

-- Insert default subjects for school students
INSERT INTO public.subjects (name, category, education_type) VALUES
-- Science subjects
('Biology', 'Science', 'school'),
('Botany', 'Science', 'school'),
('Zoology', 'Science', 'school'),
('Physics', 'Science', 'school'),
('Chemistry', 'Science', 'school'),
('Mathematics', 'Science', 'school'),
('Computer Science', 'Science', 'school'),

-- Commerce subjects
('Accounts', 'Commerce', 'school'),
('Commerce', 'Commerce', 'school'),
('Business Mathematics', 'Commerce', 'school'),
('Economics', 'Commerce', 'school'),
('Business Studies', 'Commerce', 'school'),
('Statistics', 'Commerce', 'school'),

-- Arts/Humanities subjects
('History', 'Arts', 'school'),
('Geography', 'Arts', 'school'),
('Political Science', 'Arts', 'school'),
('Sociology', 'Arts', 'school'),
('Psychology', 'Arts', 'school'),
('English', 'Arts', 'school'),
('Hindi', 'Arts', 'school'),
('Tamil', 'Arts', 'school'),
('French', 'Arts', 'school'),
('Philosophy', 'Arts', 'school'),

-- Additional subjects
('Physical Education', 'General', 'school'),
('Art', 'General', 'school'),
('Music', 'General', 'school');

-- Update the handle_new_user function to set permissions based on education type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, full_name, education_type, region, college, school, board, standard, degree, course, start_year,
    can_tutor, can_take_paid_jobs, can_post_paid_jobs
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'education_type', ''), 'school'),
    COALESCE(NEW.raw_user_meta_data->>'region', 'India'),
    COALESCE(NEW.raw_user_meta_data->>'college', ''),
    COALESCE(NEW.raw_user_meta_data->>'school', ''),
    COALESCE(NEW.raw_user_meta_data->>'board', ''),
    COALESCE(NEW.raw_user_meta_data->>'standard', ''),
    COALESCE(NEW.raw_user_meta_data->>'degree', ''),
    COALESCE(NEW.raw_user_meta_data->>'course', ''),
    COALESCE(NEW.raw_user_meta_data->>'start_year', ''),
    -- Set permissions based on education type
    CASE WHEN COALESCE(NULLIF(NEW.raw_user_meta_data->>'education_type', ''), 'school') = 'college' THEN true ELSE false END,
    CASE WHEN COALESCE(NULLIF(NEW.raw_user_meta_data->>'education_type', ''), 'school') = 'college' THEN true ELSE false END,
    true -- All users can post paid jobs
  );
  
  INSERT INTO public.user_statistics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;