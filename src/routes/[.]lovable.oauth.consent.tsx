import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

type OAuthNamespace = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

type AuthorizationDetails = {
  client?: { name?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
};

function oauthApi(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    if (!authorizationId) throw new Error("Missing authorization_id");

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return null;

    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);

    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <Shell>
      <p className="text-sm text-red-400">
        Could not load this authorisation request: {String((error as Error)?.message ?? error)}
      </p>
    </Shell>
  ),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 text-white">
        {children}
      </div>
    </main>
  );
}

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
  }, []);

  async function signIn() {
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
    if (signInError) {
      setBusy(false);
      setError(signInError.message);
    }
  }

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error: decisionError } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (decisionError) {
      setBusy(false);
      setError(decisionError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorisation server.");
      return;
    }
    window.location.href = target;
  }

  if (signedIn === false || !details) {
    return (
      <Shell>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-brand">Sign in required</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Please sign in to authorise this application to access the portfolio tools on your behalf.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => void signIn()}
          className="mt-6 w-full rounded-lg bg-brand px-4 py-2.5 font-mono text-sm text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Continue with Google
        </button>
      </Shell>
    );
  }

  const clientName = details?.client?.name ?? "an application";

  return (
    <Shell>
      <h1 className="font-mono text-2xl font-bold tracking-tight text-brand">
        Authorise {clientName}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        This grants {clientName} access to this site&apos;s tools as you: professional profile,
        experience history and areas of expertise.
      </p>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => void decide(true)}
          className="flex-1 rounded-lg bg-brand px-4 py-2.5 font-mono text-sm text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void decide(false)}
          className="flex-1 rounded-lg border border-white/15 px-4 py-2.5 font-mono text-sm text-slate-300 transition-colors hover:border-white/30 disabled:opacity-50"
        >
          Deny
        </button>
      </div>
    </Shell>
  );
}
