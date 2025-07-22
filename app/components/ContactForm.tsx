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

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

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
        setCaptchaKey(Date.now());
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
    <div className="w-full max-w-lg mx-auto p-2 text-white">
      <div className="w-full  shadow-xl p-2 md:p-10 rounded-2xl space-y-6 border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">İletişim</h2>
        </div>

        {notification && (
          <div
            className={`p-3 rounded-lg text-sm font-medium text-center transition-all duration-300 ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Ad */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Adınız"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recaptcha"
              render={() => (
                <FormItem>
                  <div className="p-2">
                    <div className="transform origin-top-left scale-[0.85] sm:scale-90 md:scale-100 transition-transform duration-300">
                      <ReCAPTCHA
                        key={captchaKey}
                        sitekey="6Ld1Z4srAAAAAKkZc3-dxfrCCaN6RJHqKU3FOyPF"
                        onChange={(token) =>
                          form.setValue("recaptcha", token || "")
                        }
                        onExpired={() => form.setValue("recaptcha", "")}
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          
            <Button
              type="submit"
              className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-white font-semibold hover:brightness-110 transition"
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
