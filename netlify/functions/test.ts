import { z } from "zod";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
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
    const validatedData = result.data;

    if (validatedData.contact_check) {
      // Honeypot was filled out — likely a bot
      return Response.json({ success: true });
    }

    console.log(validatedData);

    const { data: emailData, error } = await resend.emails.send({
      from: "FastZeeba Website <website@fastzeeba.com>",
      to: "neil.mccracken.dev@gmail.com",
      replyTo: validatedData.email,
      subject: `New website contact: ${validatedData.subject}`,
      html: `
    <h2>New Contact Form Submission</h2>

    <p>
      <strong>Name:</strong>
      ${validatedData.firstName} ${validatedData.lastName}
    </p>

    <p>
      <strong>Email:</strong>
      ${validatedData.email}
    </p>

    <p>
      <strong>Subject:</strong>
      ${validatedData.subject}
    </p>

    <p><strong>Message:</strong></p>
    <p>${validatedData.message}</p>
  `,
    });

    if (error) {
      console.error("Resend error:", error);

      return new Response(JSON.stringify({ error: "Unable to send message" }), {
        status: 500,
      });
    }

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
