import {useLoaderData} from '@remix-run/react';
import {PageBuilderPage, getPageBuilderPage} from '~/pagebuilder';

// If you host this route under a different path, update the BASE_PATH
const BASE_PATH = '/pagebuilder';

/*
 * Request the page with path from Shogun PageBuilder
 *
 * e.g. /pagebuilder/my-blog -> requests /my-blog from Shogun PageBuilder
 */
export async function loader({request, context}) {
  const url = new URL(request.url);
  const path = url.pathname.split(BASE_PATH).at(-1);

  const storeDomain = context.env.PUBLIC_STORE_DOMAIN;

  const pbPage = await getPageBuilderPage(storeDomain, path);

  return new Response(pbPage, {
    headers: {'Content-Type': 'application/text'},
  });
}

export default function PageBuilder() {
  const pageData = useLoaderData();

  return <PageBuilderPage pageData={pageData} />;
}
