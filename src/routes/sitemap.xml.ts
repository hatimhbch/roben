import { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "~/api/sitemap";

export async function GET(event: APIEvent) {
  try {
    const xml = await generateSitemap();
    
    // Sanitize the XML to prevent script injection
    const sanitizedXml = xml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .trim();

    return new Response(sanitizedXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap with just the homepage in case of errors
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://elevenone.habchaouihatim90.workers.dev</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
}
