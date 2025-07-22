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

    // Boş alan kontrolü
    if (!username || !email || !message || !recaptcha) {
      return NextResponse.json(
        { message: "Tüm alanlar doldurulmalıdır." },
        { status: 400 }
      );
    }

    // ✅ reCAPTCHA doğrulama
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`;

    const recaptchaResponse = await fetch(verifyURL, { method: "POST" });
    const recaptchaResult = await recaptchaResponse.json();

    console.log("reCAPTCHA yanıtı:", recaptchaResult);

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { message: "reCAPTCHA doğrulaması başarısız." },
        { status: 400 }
      );
    }

    // ✅ XSS koruması (sanitize)
    const cleanUsername = sanitizeHtml(username, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const cleanEmail = sanitizeHtml(email, {
      allowedTags: [],
      allowedAttributes: {},
    });
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
