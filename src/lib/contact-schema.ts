import { z } from "zod";

const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

export const contactSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, "Please enter your name").max(80, "Name is too long")),
  email: z.string().transform(clean).pipe(z.string().email("Please enter a valid email").max(120)),
  subject: z.string().transform(clean).pipe(z.string().min(3, "Subject is too short").max(120, "Subject is too long")),
  message: z.string().transform(clean).pipe(z.string().min(10, "Message should be at least 10 characters").max(4000, "Message is too long")),
  /** honeypot — must stay empty */
  company: z.string().max(0).optional().default(""),
  /** ms timestamp when the form was rendered — used as a time trap */
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.input<typeof contactSchema>;
