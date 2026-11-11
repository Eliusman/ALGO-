import { getCollection } from 'astro:content';

// Mapa del sitio automático: se genera solo con los artículos de src/content/posts/
// Resultado: https://eliusman.github.io/ALGO-/sitemap.xml
const BASE = 'https://eliusman.github.io/ALGO-/';

export async function GET() {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const urls = [
    { loc: BASE, lastmod: posts.length ? posts[0].data.pubDate : undefined },
    ...posts.map((p) => ({ loc: `${BASE}posts/${p.slug}/`, lastmod: p.data.pubDate })),
  ];

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          '  <url>\n' +
          `    <loc>${u.loc}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>\n` : '') +
          '  </url>\n'
      )
      .join('') +
    '</urlset>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
