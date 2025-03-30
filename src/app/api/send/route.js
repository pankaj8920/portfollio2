import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL; // ✅ Define `fromEmail` here

export async function POST(req) {
  const { email, subject, message } = await req.json();

  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  try {
    const data = await resend.emails.send({
      from: fromEmail,  // ✅ Use the defined variable
      to: [fromEmail, email],
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message });
  }
}
