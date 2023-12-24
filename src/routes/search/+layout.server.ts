import { getCollections } from '$lib/shopify';

export async function load() {
	return {
		collections: await getCollections()
	};
}
