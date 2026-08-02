import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "sjs-visit-counted";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const alreadyCounted =
        window.sessionStorage.getItem(SESSION_KEY) === "1";

      const { data, error } = alreadyCounted
        ? await supabase.rpc("get_site_visit_count")
        : await supabase.rpc("register_site_visit");

      if (error) {
        console.error("visitor count", error);
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, "1");
      const value = Number(data);
      if (!cancelled && Number.isFinite(value)) setCount(value);
    };


    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-xs tabular-nums text-slate-300 transition-colors hover:text-slate-400">
      {count.toLocaleString("en-GB")} visits
    </span>
  );
}
