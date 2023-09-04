import {CartForm} from '@shopify/hydrogen';

/**
 * Parse the FormData created by Shogun PageBuilder and map it to the FormData used by the Hydrogen action /cart.
 *
 * @param {FormData} pbFormData
 * @param {import('@remix-run/react').SubmitFunction} submit
 */
export function addToCart(pbFormData, submit) {
  const productId = pbFormData.get('id');

  if (!productId) {
    throw new Error('Something went wrong - product id is not defined');
  }

  const quantity = Number(pbFormData.get('quantity')) || 1;

  const line = {
    merchandiseId: `gid://shopify/ProductVariant/${productId}`,
    quantity,
  };

  const formData = createCartFormData(CartForm.ACTIONS.LinesAdd, {
    lines: [line],
  });

  submit(formData, {method: 'POST', action: '/cart'});
}

/**
 * Construct a FormData object that matches the input expected by Hydrogen /cart action
 *
 * See /routes/($locale).cart.jsx
 * @param {import('@shopify/hydrogen').CartForm.ACTIONS} action
 * @param {import('@shopify/hydrogen').CartActionInput} inputs
 *
 * @returns {FormData}
 */
export function createCartFormData(action, inputs) {
  const body = new FormData();

  body.append(
    CartForm.INPUT_NAME,
    JSON.stringify({
      action,
      inputs,
    }),
  );

  return body;
}
