import { z } from "zod";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = ["https://fastzeeba.com", "https://www.fastzeeba.com"];

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : "";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(
  body: object,
  status: number,
  headers: Record<string, string>,
) {
  return Response.json(body, {
    status,
    headers,
  });
}
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
  const origin = request.headers.get("origin");
  console.log(origin);
  const headers = corsHeaders(origin);
  console.log(headers);
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  if (request.method !== "POST") {
    return jsonResponse(
      { success: false, message: "Method not allowed" },
      405,
      headers,
    );
  }
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return jsonResponse(
        { success: false, messsage: "Invalid Form Data" },
        400,
        headers,
      );
    }
    const validatedData = result.data;

    // Honeypot
    if (validatedData.contact_check) {
      return jsonResponse({ success: true }, 200, headers);
    }

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

      return jsonResponse(
        { success: false, message: "Unable to send message" },
        500,
        headers,
      );
    }

    return jsonResponse(
      {
        success: true,
        message: "Form submitted successfully",
      },
      200,
      headers,
    );
  } catch {
    return jsonResponse(
      { success: false, message: "Invalid request" },
      400,
      headers,
    );
  }
};
