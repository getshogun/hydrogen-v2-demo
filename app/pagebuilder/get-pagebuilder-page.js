const PAGEBUILDER_API_URL = 'https://hydrogen.getshogun.com';

/**
 * Request the HTML of a Shogun PageBuilder Page
 *
 * @param {String} storeDomain
 * @param {String}  pagePath
 *
 * @returns {Promise<String>} htmlString
 */
export async function getPageBuilderPage(storeDomain, pagePath) {
  const response = await fetch(
    `${PAGEBUILDER_API_URL}/shopify/hydrogen/page?site_url=${storeDomain}&path=${pagePath}`,
  );

  return await response.text();
}
