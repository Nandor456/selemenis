import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/EmailTemplate";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  if (!resendApiKey) {
    return Response.json(
      {
        error: {
          message:
            "Missing RESEND_API_KEY. Add it to .env.local (and your deployment env).",
        },
      },
      { status: 500 },
    );
  }

  const { name, email, phone, type, message } = (await request.json()) as {
    name: string;
    email: string;
    phone: string;
    type: string;
    message: string;
  };

  if (!name || !type) {
    return Response.json(
      { error: { message: "Missing required fields: name and type." } },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["mezeinandor23@gmail.com"],
      subject: type,
      react: EmailTemplate({ name, email, phone, type, message }),
    });

    if (error) {
      return Response.json(
        {
          error: {
            name: error.name,
            message: error.message,
          },
        },
        { status: 502 },
      );
    }

    return Response.json(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Unknown error";

    console.error("Failed to send email via Resend:", error);

    return Response.json(
      {
        error: {
          message,
        },
      },
      { status: 500 },
    );
  }
}
