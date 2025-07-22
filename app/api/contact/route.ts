import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import sanitizeHtml from "sanitize-html";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, message, recaptcha } = body;

   
    if (!username || !email || !message || !recaptcha) {
      return NextResponse.json(
        { message: "Tüm alanlar doldurulmalıdır." },
        { status: 400 }
      );
    }

    
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY tanımlı değil.");
      return NextResponse.json(
        { message: "Sunucu yapılandırma hatası." },
        { status: 500 }
      );
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${recaptcha}`,
    });

    const captchaData = await verifyRes.json();

    console.log("reCAPTCHA yanıtı:", JSON.stringify(captchaData, null, 2));

    if (!captchaData.success) {
      const errors = captchaData["error-codes"]?.join(", ") || "Bilinmeyen hata";
      return NextResponse.json(
        { message: `reCAPTCHA doğrulaması başarısız: ${errors}` },
        { status: 400 }
      );
    }

    const cleanUsername = sanitizeHtml(username, { allowedTags: [], allowedAttributes: {} });
    const cleanEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
    const cleanMessage = sanitizeHtml(message, {
      allowedTags: ["b", "i", "em", "strong", "a", "br", "p"],
      allowedAttributes: { a: ["href", "target"] },
    });


    await resend.emails.send({
      from: "info@sabriogluhafriyat.com.tr",
      to: "info@sabriogluhafriyat.com.tr",
      subject: "Yeni İletişim Formu",
      html: `
        <h2>Yeni Mesaj</h2>
        <p><strong>İsim:</strong> ${cleanUsername}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Mesaj:</strong><br>${cleanMessage.replace(/\n/g, "<br>")}</p>
      `,
    });

   
    await addDoc(collection(db, "gelenKutusu"), {
      username: cleanUsername,
      email: cleanEmail,
      message: cleanMessage,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ message: "Mesaj başarılı!" }, { status: 200 });
  } catch (error) {
    console.error("Form gönderme hatası:", error);
    return NextResponse.json(
      { message: "Sunucu hatası. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
