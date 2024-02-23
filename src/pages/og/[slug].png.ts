import type { APIContext } from 'astro';
import { getOgImage } from '../../components/OgImage';
import type { RequestHandler } from '@sveltejs/kit'
import { getAllPosts, getPostBySlug } from '../../lib/notion/client';

export const prerender = true

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: { slug: post.Slug },
  }));
}

export async function get({ params }: APIContext) {
  if (params.slug === undefined) return;
  const post = await getPostBySlug(params.slug);
  const body = await getOgImage(post?.Title ?? 'No title');

  return { body, encoding: 'binary' };
}