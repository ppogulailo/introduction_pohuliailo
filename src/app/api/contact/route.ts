import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const runtime = "nodejs";

const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type ContactPayload = {
  name: string;
  email: string;
  project: string;
  token: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ContactPayload;

    if (!data.token) {
      return NextResponse.json({ error: "Missing captcha token" }, { status: 400 });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return NextResponse.json({ error: "Missing server captcha configuration" }, { status: 500 });
    }

    const captchaBody = new URLSearchParams({
      secret: recaptchaSecret,
      response: data.token,
    });

    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: captchaBody.toString(),
    });

    const captchaJson = await captchaRes.json();
    if (!captchaJson.success || captchaJson.score < 0.5) {
      console.warn("RECAPTCHA FAILED", captchaJson);
      return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
    }

    if (!data.name?.trim() || !data.email?.trim() || !data.project?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bodyText = `
Name: ${data.name}
Email: ${data.email}
Project:
${data.project}
`;

    const cmd = new SendEmailCommand({
      Destination: { ToAddresses: [process.env.SES_TO_EMAIL!] },
      Message: {
        Subject: { Data: "New Contact Request" },
        Body: { Text: { Data: bodyText } },
      },
      Source: process.env.SES_FROM_EMAIL!,
    });

    await client.send(cmd);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SES CONTACT API ERROR", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
