import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";


const formSchema = z.object({
  username: z.string().min(2, { message: "En az 2 karakter" }),
  email: z.string().email({ message: "Geçerli bir e-posta giriniz." }),
  message: z.string().min(10, { message: "En az 10 karakter" }),
  recaptcha: z.string().min(1, "Robot olmadığınızı doğrulayın."),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Geçersiz form verisi." },
        { status: 400 }
      );
    }

    const { username, email, message, recaptcha } = parsed.data;

   
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "bilinmiyor";

   
    const q = query(
      collection(db, "gelenKutusu"),
      where("ip", "==", ip),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(q);
    const lastDoc = snapshot.docs[0];
    if (lastDoc) {
      const lastTime = lastDoc.data().createdAt.toDate().getTime();
      const nowTime = new Date().getTime();
      const diffSeconds = (nowTime - lastTime) / 1000;

      if (diffSeconds < 60) {
        return NextResponse.json(
          { message: "Çok fazla istek. Lütfen biraz bekleyin." },
          { status: 429 }
        );
      }
    }


    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
      { method: "POST" }
    );
    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { message: "reCAPTCHA doğrulaması başarısız." },
        { status: 400 }
      );
    }

    
    const cleanUsername = sanitizeHtml(username, { allowedTags: [], allowedAttributes: {} });
    const cleanEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
    const cleanMessage = sanitizeHtml(message, {
      allowedTags: ["b", "i", "em", "strong", "a", "br", "p"],
      allowedAttributes: {
        a: ["href", "target"],
      },
    });

   
    const emailResponse = await resend.emails.send({
      from: "info@sabriogluhafriyat.com.tr",
      to: "info@sabriogluhafriyat.com.tr",
      subject: "Yeni İletişim Formu",
      html: `
        <h2>Mail</h2>
        <p><strong>İsim:</strong> ${cleanUsername}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Mesaj:</strong><br>${cleanMessage.replace(/\n/g, "<br>")}</p>
      `,
    });

   
    await addDoc(collection(db, "gelenKutusu"), {
      username: cleanUsername,
      email: cleanEmail,
      message: cleanMessage,
      ip,
      createdAt: Timestamp.now(),
    });

    console.log("E-posta gönderildi:", emailResponse);
    return NextResponse.json({ message: "Mesajınız başarıyla gönderildi." });
  } catch (error) {
    console.error("Sunucu hatası:", error);
    return NextResponse.json(
      { message: "Mesaj gönderilirken hata oluştu." },
      { status: 500 }
    );
  }
}
