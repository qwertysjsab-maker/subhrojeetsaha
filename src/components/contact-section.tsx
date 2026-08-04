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

  const inputClasses =
    "w-full border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand";

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.24em] text-brand">Correspondence</p>
          <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Open an enquiry.
          </h2>
          <p className="mb-8 max-w-md leading-relaxed text-muted-foreground">
            Enquiries are welcome regarding senior appointments and advisory engagements in
            technology risk, compliance, third-party risk and security governance. Correspondence
            submitted below reaches Subhrojeet directly and is treated in confidence.
          </p>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-foreground underline decoration-brand underline-offset-4 transition-colors hover:text-brand"
          >
            View LinkedIn profile →
          </a>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground"
            >
              Name
            </label>
            <input
              id="name"
              required
              maxLength={120}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground"
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
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground"
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
              className={`${inputClasses} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {sending ? "Submitting..." : "Submit enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
