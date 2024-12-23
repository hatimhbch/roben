import { supabase } from "~/utils/supabaseClient";

export async function generateSitemap() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, publish_date')
    .order('publish_date', { ascending: false });

  const baseUrl = 'https://elevenone.habchaouihatim90.workers.dev';
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Posts -->
  ${posts ? posts.map(post => `  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.publish_date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n') : ''}
</urlset>`; 

  return xml;
}
