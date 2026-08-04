import { createServerFn } from "@tanstack/react-start";

const ROW_ID = "landing";

async function readCount(): Promise<number> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("site_visits")
    .select("count")
    .eq("id", ROW_ID)
    .maybeSingle();
  if (error) throw error;
  return Number(data?.count ?? 0);
}

export const getSiteVisitCount = createServerFn({ method: "GET" }).handler(
  async () => ({ count: await readCount() }),
);

export const registerSiteVisit = createServerFn({ method: "POST" }).handler(
  async () => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const current = await readCount();
    const next = current + 1;
    const { error } = await supabaseAdmin
      .from("site_visits")
      .update({ count: next, updated_at: new Date().toISOString() })
      .eq("id", ROW_ID);
    if (error) throw error;
    return { count: next };
  },
);
