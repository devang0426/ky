"use server";

import { whatsappLink } from "@/lib/site";

export type EnquiryState = {
  status: "idle" | "error" | "sent";
  message?: string;
  whatsappUrl?: string;
};

const topics = ["A piece from the collection", "A custom design", "A gift", "Something else"];

/**
 * Handles the "leave a note" form. There is no mail service wired up yet, so the
 * enquiry is logged on the server and turned into a prefilled WhatsApp message
 * the visitor can send in one tap. Swap the console.log for Resend/SES/etc.
 */
export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) return { status: "error", message: "Please tell us your name." };
  if (phone.replace(/\D/g, "").length < 10) return { status: "error", message: "Please add a WhatsApp number we can reach you on." };
  if (!topics.includes(topic)) return { status: "error", message: "Please choose what you're looking for." };
  if (message.length < 5) return { status: "error", message: "A line or two about the piece helps us reply faster." };
  if (message.length > 1500) return { status: "error", message: "That note is a little long; keep it under 1500 characters." };

  console.info("[enquiry]", { name, phone, topic, message, at: new Date().toISOString() });

  const text = `Hi Kiyanaa, I'm ${name}. I'm looking for: ${topic}.\n\n${message}\n\nReach me on ${phone}.`;
  return {
    status: "sent",
    message: "Thank you. We usually reply within a few hours. You can also send this straight to WhatsApp.",
    whatsappUrl: whatsappLink(text),
  };
}
