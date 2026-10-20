import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // Obtiene automáticamente todos tus archivos .md de la colección
  const posts = await getCollection('blog');

  return rss({
    title: 'Algo + que Música y Radio',
    description: 'Un espacio personal de música, vivencias, ciencia al estilo Sagan y reflexiones íntimas. Descubre historias contadas desde la calma y la memoria viva.',
    site: context.site,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `
      <language>es</language>
      <copyright>© 2026 Algo + que Música &amp; Radio</copyright>
      <atom:link href="https://eliusman.github.io/ALGO-/feed.xml" rel="self" type="application/rss+xml" />
    `,
    // Mapea cada archivo Markdown de manera automática para el RSS
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Construye la ruta de cada post basándose en el nombre de tu archivo .md
      link: `https://eliusman.github.io/ALGO-/posts/${post.slug}/`,
      guid: post.slug,
    })),
  });
}
