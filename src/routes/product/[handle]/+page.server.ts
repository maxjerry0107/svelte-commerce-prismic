import { createClient } from '$lib/prismicio';
import { getProduct, getProductRecommendations } from '$lib/shopify';
import type { Product } from '$lib/shopify/types.js';
export async function load({ params, fetch, cookies }) {
	const handle = params.handle;
	const product = await getProduct(handle);
	let relatedProducts: Product[] = [];
	if (product) {
		relatedProducts = await getProductRecommendations(product?.id);
	}
	const client = createClient({ fetch, cookies });
	let prismicData = null;
	try {
		prismicData = await client.getByUID("product_page", handle)
	} catch (error) {
		console.error("no data on prismic")
	}
	return {
		product,
		relatedProducts,
		prismicData
	};
}
