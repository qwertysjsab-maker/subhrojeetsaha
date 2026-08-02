CREATE OR REPLACE FUNCTION public.get_site_visit_count()
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count FROM public.site_visits WHERE id = 'landing';
$$;

GRANT EXECUTE ON FUNCTION public.get_site_visit_count() TO anon, authenticated;