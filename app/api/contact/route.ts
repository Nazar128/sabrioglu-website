import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { username, email, message, recaptcha } = await req.json();

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
      { method: "POST" }
    );

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed." },
        { status: 400 }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "info@sabriogluhafriyat.com.tr",
      to: "info@sabriogluhafriyat.com.tr",
      subject: "Yeni İletişim Formu",
      html: `
            <h2>Mail</h2>
            <p><strong>İsim:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mesaj:</strong> ${message}</p>
            `,
    });
       await addDoc(collection(db, "gelenKutusu"), {
      username,
      email,
      message,
      createdAt: Timestamp.now()
    });
    console.log("Email send:", emailResponse);
    return NextResponse.json({ message: "Mesaj başarılı!" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Mesaj başarısız!" }, { status: 500 });
  }
}  