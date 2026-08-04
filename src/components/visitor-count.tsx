import { useEffect, useState } from "react";

import {
  getSiteVisitCount,
  registerSiteVisit,
} from "@/lib/visits.functions";

const SESSION_KEY = "sjs-visit-counted";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const alreadyCounted =
        window.sessionStorage.getItem(SESSION_KEY) === "1";

      try {
        const { count: value } = alreadyCounted
          ? await getSiteVisitCount()
          : await registerSiteVisit();
        window.sessionStorage.setItem(SESSION_KEY, "1");
        if (!cancelled && Number.isFinite(value)) setCount(value);
      } catch {
        // Counter is decorative; stay silent on failure.
      }
    };


    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-xs tabular-nums text-slate-500 transition-colors hover:text-slate-700">
      {count.toLocaleString("en-GB")} visits
    </span>
  );
}
