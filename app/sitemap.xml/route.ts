import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.sabriogluhafriyat.com.tr"
      : "http://localhost:3000";

  const snapshot = await getDocs(collection(db, "projects"));
  const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const staticUrls = ["/", "hakkimizda", "hizmetlerimiz", "galeri", "iletisim"];

  const urls = [
    ...staticUrls.map(
      (slug) => `
  <url>
    <loc>${baseUrl}${slug === "/" ? "" : `/${slug}`}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    ),
    ...projects.map(
      (project) => `
  <url>
    <loc>${baseUrl}/projelerimiz/${project.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate"
    },
  });
}
