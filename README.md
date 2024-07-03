# Shogun with Shopify Hydrogen V2 Example

This repository shows how you can integrate the Shogun with Shopify Hydrogen V2. To use Shogun with Hydrogen, you must have Shogun installed on your Shopify store and you must be on the Shogun's Advanced plan. Shopify requires Hydrogen users be on Shopify Plus.

## Setup

1. Follow the [Hydrogen Getting Started Guide](https://shopify.dev/docs/custom-storefronts/hydrogen/getting-started/quickstart)
2. Add the folder `./app/shogun` for Shogun utilties
   ```sh
   mkdir ./app/shogun
   ```
3. Download Shogun utilities

   a. You can run this script to download required files

   ```sh
    #!/bin/bash

    REPO_URL="https://raw.githubusercontent.com/getshogun/hydrogen-v2-demo"

    mkdir -p app/shogun

    # List of file names to copy
    FILES=(
        "app/shogun/cart-helpers.js"
        "app/shogun/csp.js"
        "app/shogun/get-shogun-page.js"
        "app/shogun/index.js"
        "app/shogun/ShogunPage.jsx"
        "app/routes/(\$locale).shogun.$.jsx"
    )

    # Loop through files and fetch them
    for FILE in "${FILES[@]}"; do
      # Construct the file's raw URL
      RAW_URL="$REPO_URL/main/$FILE"

      # Fetch and save the file
      curl -o "$FILE" "$RAW_URL"
    done
   ```

   b. You can copy files manually

   ```
   - app/shogun/cart-helpers.js
   - app/shogun/csp.js
   - app/shogun/get-shogun-page.js
   - app/shogun/index.js
   - app/shogun/ShogunPage.jsx
   - routes/($locale).shogun.$.jsx
   ```

4. Update `entry.server.jsx` Content Security Policy settings

   ```jsx
   import {SHOGUN_CSP_DIRECTIVES} from '~/shogun'; // 1. import the custom CSP directives

   const {nonce, header, NonceProvider} = createContentSecurityPolicy({
     // 2. pass to createContentSecurityPolicy function
     ...SHOGUN_CSP_DIRECTIVES,
     shop: {
       checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
       storeDomain: context.env.PUBLIC_STORE_DOMAIN,
     },
   });
   ```

5. Start your local server

```sh
npm run dev
```

6. Create a Shogun account.
7. Create a new page within Shogun with path /testing using the drag-and-drop editor.
8. Click Publish within Shogun.
9. Visit http://localhost:3000/shogun/testing

## How does the integration work?

The main part of the integration is in `routes/($locale).shogun.$.jsx`

This route will load a Shogun page when a URL has the form `/shogun/[shogun-page-path]`

For example, `/shogun/my-blog` will show the Shogun page `my-blog`

### How can I serve underneath a different base path?

If you want to serve Shogun pages from a different base path rename this file.

For example, if you want to serve under `/shg` rename this to `routes/($locale).pb.$.jsx`

### How can I remove this base path?

If you want to serve Shogun pages with no base path you will need to replace the catch-all page `routes/($locale).$.jsx`

### Some requests say "blocked:csp"

<img width="222" alt="Screenshot 2024-07-03 at 11 46 59" src="https://github.com/getshogun/hydrogen-v2-demo/assets/9057181/5963b5c1-8ef2-494e-b7a4-65abe3209910">

If part of your page isn't working, check for network requests with "blocked:csp" status.

By default, Hydrogen sets up [Content Security Policy](https://shopify.dev/docs/storefronts/headless/hydrogen/content-security-policy) for security reasons but this means that any additional domains that need to be available for requests must be added to the CSP config.

[csp.js](apps/shogun/csp.js) shows the default Shogun config.

If you need to add any other domains you can add them here or make an additional config that you merge with this Shogun config.
