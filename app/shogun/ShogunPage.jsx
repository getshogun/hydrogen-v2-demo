import { useRef, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import { addToCart } from './cart-helpers';

/**
 * Shogun Page component handles initialising page and cart events
 *
 * @param {Object} props
 * @param {String} props.pageData
 */
export function ShogunPage({ pageData }) {
  const ref = useRef();
  const fetcher = useFetcher();

  useEffect(() => {
    const element = ref.current;

    const onSubmit = async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      addToCart(new FormData(event.target), fetcher.submit);
    };

    element.addEventListener('submit', onSubmit);

    dispatchShogunLoadEvent(element);

    return () => {
      element.removeEventListener('submit', onSubmit);
    };
  }, [ref.current, fetcher.submit]);

  return (
    <div ref={ref}>
      <main dangerouslySetInnerHTML={{ __html: pageData }} />
    </div>
  );
}

/**
 * @param {HTMLDivElement} rootElement
 */
function dispatchShogunLoadEvent(rootElement) {
  const event = new Event('pagebuilder:load', {
    bubbles: true,
    cancelable: true,
  });

  rootElement.dispatchEvent(event);
}
