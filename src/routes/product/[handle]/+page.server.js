import { getProduct } from '$lib/shopify';

export async function load({ params }) {
	const handle = params.handle;

	const product = await getProduct(handle);

	return {
		product
	};
}
