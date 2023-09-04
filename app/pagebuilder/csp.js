/**
 * The Content Security Policy directives to support Page Builder integration
 */
export const PB_CSP_DIRECTIVES = {
  defaultSrc: [
    // -- start: shopify defaults
    "'self'",
    'https://cdn.shopify.com',
    'http://cdn.shopify.com',
    'https://shopify.com',
    // -- end: shopify defaults

    'https://cdn.getshogun.com',
  ],
  styleSrc: [
    // -- start: shopify defaults
    "'self'",
    "'unsafe-inline'",
    'https://cdn.shopify.com',
    // -- end: shopify defaults

    'https://cdn.getshogun.com',
  ],
};
