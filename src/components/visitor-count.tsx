import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "sjs-visit-counted";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const alreadyCounted =
        typeof window !== "undefined" &&
        window.sessionStorage.getItem(SESSION_KEY) === "1";

      if (alreadyCounted) {
        const { data } = await supabase.rpc("get_site_visit_count");
        if (!cancelled && typeof data === "number") setCount(data);
        return;
      }


      const { data, error } = await supabase.rpc("register_site_visit");
      if (error) return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
      if (!cancelled && typeof data === "number") setCount(data);
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
