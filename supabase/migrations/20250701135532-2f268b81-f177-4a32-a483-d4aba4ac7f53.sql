-- Fix the handle_new_user function to provide default education_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, education_type, region, college, school, board, standard, degree, course, start_year)
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
    COALESCE(NEW.raw_user_meta_data->>'start_year', '')
  );
  
  INSERT INTO public.user_statistics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;