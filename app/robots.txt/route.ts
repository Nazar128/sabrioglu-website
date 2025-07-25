import { NextResponse } from "next/server";

export function GET() {
    const content = `
User-agent: *
Disallow: /login
Disallow: /admin
Disallow: /admin/galeri
Disallow: /admin/mesaj
Disallow: /admin/projeler

Sitemap: https://www.sabriogluhafriyat.com.tr/sitemap.xml
`;

    return new NextResponse(content.trim(), {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}