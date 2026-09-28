"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import { WhatsAppIcon } from "@/components/site/Icons";

const initial: EnquiryState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  return (
    <form action={action} className="flex flex-col gap-[18px] rounded-[4px] border border-line bg-field p-6 lg:p-10">
      <h2 className="font-serif text-[26px] font-normal lg:text-[30px]">
        Or leave a <em>note</em>
      </h2>
      <div className="grid gap-[18px] sm:grid-cols-2">
        <Field label="Name" id="name">
          <input id="name" name="name" type="text" placeholder="Your name" required className="field" />
        </Field>
        <Field label="WhatsApp number" id="phone">
          <input id="phone" name="phone" type="tel" placeholder="+91" required className="field" />
        </Field>
      </div>
      <Field label="I'm looking for" id="topic">
        <select id="topic" name="topic" className="field" defaultValue="A piece from the collection">
          <option>A piece from the collection</option>
          <option>A custom design</option>
          <option>A gift</option>
          <option>Something else</option>
        </select>
      </Field>
      <Field label="Message" id="message">
        <textarea id="message" name="message" placeholder="A cocktail ring for…" required className="field h-[120px] resize-none py-3" />
      </Field>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-crimson">
          {state.message}
        </p>
      )}
      {state.status === "sent" ? (
        <div className="flex flex-col gap-3 border-t border-line pt-4">
          <p className="text-sm text-emerald">{state.message}</p>
          <a href={state.whatsappUrl} target="_blank" rel="noreferrer" className="btn-pill h-[52px] self-start bg-emerald text-cream">
            <WhatsAppIcon size={16} /> Send on WhatsApp
          </a>
        </div>
      ) : (
        <button type="submit" disabled={pending} className="btn-pill h-[52px] self-start bg-ink px-10 text-cream hover:bg-body disabled:opacity-60">
          {pending ? "Sending…" : "Send"}
        </button>
      )}
    </form>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs tracking-[0.1em] text-muted uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
