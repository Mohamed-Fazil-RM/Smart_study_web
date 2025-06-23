
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  education_type TEXT CHECK (education_type IN ('school', 'college')),
  region TEXT DEFAULT 'India',
  college TEXT,
  school TEXT,
  board TEXT,
  standard TEXT,
  degree TEXT,
  course TEXT,
  start_year TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  code TEXT,
  instructor TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course materials table
CREATE TABLE public.course_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_type TEXT CHECK (file_type IN ('pdf', 'image', 'doc', 'video', 'notes')),
  material_type TEXT CHECK (material_type IN ('notes', 'pyqs', 'videos', 'assignments')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  task_date DATE NOT NULL,
  task_time TIME NOT NULL,
  task_type TEXT CHECK (task_type IN ('study', 'meet', 'project', 'assignment')),
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'not_marked')) DEFAULT 'not_marked',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum posts table
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  is_paid BOOLEAN DEFAULT FALSE,
  payment_amount DECIMAL(10,2),
  post_type TEXT CHECK (post_type IN ('help', 'collaboration', 'paid')) DEFAULT 'help',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum replies table
CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user statistics table
CREATE TABLE public.user_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tasks_completed INTEGER DEFAULT 0,
  tasks_failed INTEGER DEFAULT 0,
  tasks_not_marked INTEGER DEFAULT 0,
  resources_downloaded INTEGER DEFAULT 0,
  resources_uploaded INTEGER DEFAULT 0,
  forum_posts_created INTEGER DEFAULT 0,
  forum_replies_made INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create storage bucket for course materials
INSERT INTO storage.buckets (id, name, public) VALUES ('course-materials', 'course-materials', true);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statistics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for courses
CREATE POLICY "Users can view their own courses" ON public.courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own courses" ON public.courses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own courses" ON public.courses FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for course materials
CREATE POLICY "Users can view their own materials" ON public.course_materials FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own materials" ON public.course_materials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own materials" ON public.course_materials FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own materials" ON public.course_materials FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for tasks
CREATE POLICY "Users can view their own tasks" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks" ON public.tasks FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for forum posts (public read, authenticated write)
CREATE POLICY "Anyone can view forum posts" ON public.forum_posts FOR SELECT TO authenticated;
CREATE POLICY "Authenticated users can create posts" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.forum_posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for forum replies (public read, authenticated write)
CREATE POLICY "Anyone can view public replies" ON public.forum_replies FOR SELECT TO authenticated USING (is_private = false OR auth.uid() = user_id);
CREATE POLICY "Authenticated users can create replies" ON public.forum_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own replies" ON public.forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own replies" ON public.forum_replies FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user statistics
CREATE POLICY "Users can view their own statistics" ON public.user_statistics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own statistics" ON public.user_statistics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own statistics" ON public.user_statistics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Storage policies for course materials
CREATE POLICY "Users can upload their own materials" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view their own materials" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own materials" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own materials" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, education_type, region, college, school, board, standard, degree, course, start_year)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'education_type', ''),
    COALESCE(NEW.raw_user_meta_data->>'region', 'India'),
    COALESCE(NEW.raw_user_meta_data->>'college', ''),
    COALESCE(NEW.raw_user_meta_data->>'school', ''),
    COALESCE(NEW.raw_user_meta_data->>'board', ''),
    COALESCE(NEW.raw_user_meta_data->>'standard', ''),
    COALESCE(NEW.raw_user_meta_data->>'degree', ''),
    COALESCE(NEW.raw_user_meta_data->>'course', ''),
    COALESCE(NEW.raw_user_meta_data->>'start_year', '')
  );
  
  INSERT INTO public.user_statistics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user statistics
CREATE OR REPLACE FUNCTION public.update_user_statistics()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'tasks' THEN
    IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
      UPDATE public.user_statistics 
      SET 
        tasks_completed = tasks_completed + CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
        tasks_failed = tasks_failed + CASE WHEN NEW.status = 'failed' THEN 1 ELSE 0 END,
        tasks_not_marked = tasks_not_marked + CASE WHEN NEW.status = 'not_marked' THEN 1 ELSE 0 END,
        updated_at = NOW()
      WHERE user_id = NEW.user_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'course_materials' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.user_statistics 
      SET resources_uploaded = resources_uploaded + 1, updated_at = NOW()
      WHERE user_id = NEW.user_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'forum_posts' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.user_statistics 
      SET forum_posts_created = forum_posts_created + 1, updated_at = NOW()
      WHERE user_id = NEW.user_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'forum_replies' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.user_statistics 
      SET forum_replies_made = forum_replies_made + 1, updated_at = NOW()
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for updating statistics
CREATE TRIGGER update_task_statistics AFTER UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_user_statistics();
CREATE TRIGGER update_material_statistics AFTER INSERT ON public.course_materials FOR EACH ROW EXECUTE FUNCTION public.update_user_statistics();
CREATE TRIGGER update_post_statistics AFTER INSERT ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_user_statistics();
CREATE TRIGGER update_reply_statistics AFTER INSERT ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION public.update_user_statistics();
