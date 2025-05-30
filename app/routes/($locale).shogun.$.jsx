import { useLoaderData } from '@remix-run/react';
import { useNonce } from '@shopify/hydrogen';
import { ShogunPage, getShogunPage } from '~/shogun';

// If you host this route under a different path, update the BASE_PATH
const BASE_PATH = '/shogun';

/*
 * We cache the page for 30s and set stale-while-revalidate to 30s
 *
 * This means at worst case users will be served a stale page for 1 minute after a new version becomes available
 *
 * You can change these values https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate
 */
const CACHE_CONTROL = 'public, max-age=30, stale-while-revalidate=30';

/*
 * Request the page with path from Shogun
 *
 * e.g. /shogun/my-blog -> requests /my-blog from Shogun
 */
export async function loader({ request, context }) {
  const url = new URL(request.url);
  const path = url.pathname.split(BASE_PATH).at(-1);

  const storeDomain = context.env.PUBLIC_STORE_DOMAIN;

  const shgPage = await getShogunPage(storeDomain, path);

  return new Response(shgPage, {
    headers: {
      'Content-Type': 'application/text',
      'Cache-Control': CACHE_CONTROL,
    },
  });
}

export default function Shogun() {
  const pageData = useLoaderData();
  const nonce = useNonce();

  // Inject nonce in script tags for CSP compliance
  const processedHtml = nonce
  ? pageData.replace(
      /<script(?![^>]*\bnonce=)([^>]*)>/gi,
      `<script nonce="${nonce}"$1>`
    )
  : pageData;

  return <ShogunPage pageData={processedHtml} />;
}
