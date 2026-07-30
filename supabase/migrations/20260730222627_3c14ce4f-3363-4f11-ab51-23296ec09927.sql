ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';

ALTER TABLE public.contact_messages ADD CONSTRAINT contact_messages_email_length CHECK (char_length(email) <= 200);