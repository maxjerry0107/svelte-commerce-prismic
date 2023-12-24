import { getProduct, getProductRecommendations } from '$lib/shopify';
import type { Product } from '$lib/shopify/types.js';
export async function load({ params }) {
	const handle = params.handle;
	const product = await getProduct(handle);
	let relatedProducts: Product[] = [];
	if (product) {
		relatedProducts = await getProductRecommendations(product?.id);
	}
	return {
		product,
		relatedProducts
	};
}
