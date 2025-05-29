/**
 * The Content Security Policy directives to support Shogun integration
 */
export const SHOGUN_CSP_DIRECTIVES = {
  defaultSrc: [
    // -- Start: CSP settings for src
    "'unsafe-inline'",
    // "'strict-dynamic'",
    // -- End: CSP settings for src

    // -- start: shopify defaults
    "'self'",
    'https://cdn.shopify.com',
    'http://cdn.shopify.com',
    'https://shopify.com',
    // -- end: shopify defaults

    'https://cdn.getshogun.com',
    'https://i.shgcdn.com',
    'https://a.shgcdn2.com',
    'https://views.unsplash.com',
    'https://fonts.gstatic.com',
    'https://www.youtube.com',
    'https://img.youtube.com',
    'https://maxcdn.bootstrapcdn.com',
  ],
  styleSrc: [
    "'unsafe-inline'",

    // -- start: shopify defaults
    "'self'",
    'https://cdn.shopify.com',
    // -- end: shopify defaults

    'https://cdn.getshogun.com',
    'https://i.shgcdn.com',
    'https://a.shgcdn2.com',
    'https://fonts.googleapis.com',
  ],
};
