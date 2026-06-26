import rss from '@astrojs/rss';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  if (!context.site) {
    return new Response('RSS feed unavailable: SITE_URL is not configured', { status: 404 });
  }

  const posts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.subtitle ?? post.data.description ?? '',
      pubDate: post.data.date,
      link: `/${post.id.replace(/^(\d{4})-(\d{2})-(\d{2})-/, '$1/$2/$3/')}`,
    })),
  });
}
