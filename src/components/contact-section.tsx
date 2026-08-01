import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { PROFILE } from "@/lib/profile";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);

    const { error } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    setSending(false);

    if (error) {
      toast.error("Your message could not be sent. Please try again.");
      return;
    }

    toast.success("Thank you — your message has been received.");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="border-t border-slate-100 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-4xl font-bold">Get in touch.</h2>
          <p className="mb-8 max-w-md leading-relaxed text-slate-600">
            I welcome enquiries regarding senior appointments and advisory
            engagements in technology risk, compliance, third-party risk and
            security governance. Correspondence submitted below reaches me
            directly and is treated in confidence.
          </p>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-slate-500 underline decoration-brand underline-offset-4 transition-colors hover:text-brand"
          >
            View LinkedIn profile →
          </a>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-slate-400"
            >
              Name
            </label>
            <input
              id="name"
              required
              maxLength={120}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition-colors focus:border-brand"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-slate-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={200}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition-colors focus:border-brand"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-slate-400"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              maxLength={4000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition-colors focus:border-brand"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-lg bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {sending ? "Submitting..." : "Submit enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
