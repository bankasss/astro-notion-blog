import type { APIRoute } from 'astro';
import { getOgImage } from '../../components/OgImage';
import { getAllPosts, getPostBySlug } from '../../lib/notion/client';

export const prerender = true;

/**
 * 静的生成する slug 一覧
 */
export async function getStaticPaths() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    params: { slug: post.Slug },
  }));
}

/**
 * PNG を返す API Route
 */
export const GET: APIRoute = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return new Response('Not Found', { status: 404 });
  }

  const post = await getPostBySlug(slug);
  const png = await getOgImage(post?.Title ?? 'No title');

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
