import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.email().trim().max(254),
  subject: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .refine(
      (value) => !value.includes("\r") && !value.includes("\n"),
      "Invalid subject",
    ),
  message: z.string().trim().min(1).max(5000),
  contact_check: z.string().optional(),
});

export default async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 },
    );
  }
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { success: false, message: "Invalid form data" },
        { status: 400 },
      );
    }
    const data = result.data;

    if (data.contact_check) {
      // Honeypot was filled out — likely a bot
      return Response.json({ success: true });
    }

    console.log(data);

    return Response.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch {
    return Response.json(
      { success: false, message: "Invalid request" },
      { status: 400 },
    );
  }
};
