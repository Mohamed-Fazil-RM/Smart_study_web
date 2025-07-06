-- Update the handle_new_user function to better handle Google OAuth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $function$
BEGIN
  -- Handle both Google OAuth and email/password signup
  INSERT INTO public.profiles (
    id, full_name, education_type, region, college, school, board, standard, degree, course, start_year,
    can_tutor, can_take_paid_jobs, can_post_paid_jobs
  )
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      SPLIT_PART(NEW.email, '@', 1)
    ),
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
$function$;