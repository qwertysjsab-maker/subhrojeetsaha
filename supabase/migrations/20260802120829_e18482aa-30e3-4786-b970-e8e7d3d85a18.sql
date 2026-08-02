CREATE TABLE public.site_visits (
  id text PRIMARY KEY,
  count bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.site_visits TO service_role;

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

INSERT INTO public.site_visits (id, count) VALUES ('landing', 0);

CREATE OR REPLACE FUNCTION public.register_site_visit()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count bigint;
BEGIN
  UPDATE public.site_visits
     SET count = count + 1, updated_at = now()
   WHERE id = 'landing'
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.register_site_visit() TO anon, authenticated;