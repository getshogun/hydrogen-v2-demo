# Shogun PageBuilder with Shopify Hydrogen V2 Example

This repository shows how you can integrate the Shogun PageBuilder with Shopify Hydrogen V2. To use Shogun with Hydrogen, you must have Shogun installed on your Shopify store and you must be on the Shogun's Advanced plan. Shopify requires Hydrogen users be on Shopify Plus.

## Setup

1. Follow the [Hydrogen Getting Started Guide](https://shopify.dev/docs/custom-storefronts/hydrogen/getting-started/quickstart)
2. Add the folder `./app/pagebuilder` for Shogun PageBuilder utilties
   ```sh
   mkdir ./app/pagebuilder
   ```
3. Download Shogun PageBuilder utilities

   a. You can run this script to download required files

   ```sh
    #!/bin/bash

    REPO_URL="https://raw.githubusercontent.com/getshogun/hydrogen-v2-demo"

    mkdir -p app/pagebuilder

    # List of file names to copy
    FILES=(
        "app/pagebuilder/cart-helpers.js"
        "app/pagebuilder/csp.js"
        "app/pagebuilder/get-pagebuilder-page.js"
        "app/pagebuilder/index.js"
        "app/pagebuilder/PageBuilderPage.jsx"
        "app/routes/(\$locale).pagebuilder.$.jsx"
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
   - app/pagebuilder/cart-helpers.js
   - app/pagebuilder/csp.js
   - app/pagebuilder/get-pagebuilder-page.js
   - app/pagebuilder/index.js
   - app/pagebuilder/PageBuilderPage.jsx
   - routes/($locale).pagebuilder.$.jsx
   ```

4. Update `entry.server.jsx` Content Security Policy settings

   ```jsx
   import {PB_CSP_DIRECTIVES} from '~/pagebuilder'; // 1. import the custom CSP directives

   const {nonce, header, NonceProvider} = createContentSecurityPolicy({
     // 2. pass to createContentSecurityPolicy function
     ...PB_CSP_DIRECTIVES,
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

6. Create a PageBuilder account.
7. Create a new page within page builder with path /testing using the drag-and-drop editor.
8. Click Publish within PageBuilder.
9. Visit http://localhost:3000/pagebuilder/testing

## How does the integration work?

The main part of the integration is in `routes/($locale).pagebuilder.$.jsx`

This route will load a Shogun PageBuilder page when a URL has the form `/pagebuilder/[page-builder-page-path]`

For example, `/pagebuilder/my-blog` will show the PageBuilder page `my-blog`

### How can I serve underneath a different base path?

If you want to serve PageBuilder pages from a different base path rename this file.

For example, if you want to serve under `/pb` rename this to `routes/($locale).pb.$.jsx`

### How can I remove this base path?

If you want to serve PageBuilder pages with no base path you will need to replace the catch-all page `routes/($locale).$.jsx`
