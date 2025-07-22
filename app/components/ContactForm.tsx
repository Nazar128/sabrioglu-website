"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// SSR hatasını engellemek için dinamik import
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

// Form şeması
const formSchema = z.object({
  username: z.string().min(2, { message: "En az 2 karakter" }),
  email: z.string().email({ message: "Geçerli bir e-posta giriniz." }),
  message: z.string().min(10, { message: "En az 10 karakter" }),
  recaptcha: z.string().min(1, "Robot olmadığınızı doğrulayın."),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
      recaptcha: "",
    },
  });

  const [captchaKey, setCaptchaKey] = useState<number>(Date.now());
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form gönderimi
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Gönderilen değerler:", values);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log("Sunucu yanıtı:", result);

      if (response.ok) {
        setNotification({
          type: "success",
          message: "✅ Mesajınız başarıyla gönderildi!",
        });
        form.reset();
        setCaptchaKey(Date.now()); // reCAPTCHA reset
      } else {
        setNotification({
          type: "error",
          message: result.message || "❌ Mesaj gönderilemedi.",
        });
      }
    } catch (error) {
      console.error("Hata:", error);
      setNotification({
        type: "error",
        message: "❌ Beklenmeyen bir hata oluştu.",
      });
    }

    setTimeout(() => setNotification(null), 4000);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full border border-white/20 shadow-xl p-6 md:p-10 rounded-xl text-white">
        <h2 className="text-2xl font-bold text-center mb-6">İletişim</h2>

        {notification && (
          <div
            className={`mb-4 p-3 rounded-md text-sm font-medium transition-all duration-300 ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* İsim */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Adınız"
                      className="input-style"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@gmail.com"
                      className="input-style"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mesaj */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Mesajınız"
                      rows={4}
                      className="input-style resize-none rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* reCAPTCHA */}
            <FormField
              control={form.control}
              name="recaptcha"
              render={() => (
                <FormItem>
                  <ReCAPTCHA
                    key={captchaKey}
                    sitekey="6LejVYsrAAAAAFLazF9jxRu-hxM6sPXkc1TD3n3Z"
                    onChange={(token) =>
                      form.setValue("recaptcha", token || "")
                    }
                    onExpired={() => form.setValue("recaptcha", "")}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-2 py-2 rounded-full bg-gradient-to-l from-[#000022] via-[#000044] to-[#000022] text-white font-semibold hover:brightness-125 transition"
            >
              Gönder
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
