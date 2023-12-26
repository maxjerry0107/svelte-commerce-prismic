import { defaultSort, sorting } from '$lib/constants';
import { createClient } from '$lib/prismicio.js';
import { getCollectionWithProducts } from '$lib/shopify';

export async function load({ params, url, fetch, cookies }) {
	const sort = url.searchParams.get('sort');
	const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
	const handle = params.collection;
	const collection = await getCollectionWithProducts({
		handle,
		sortKey,
		reverse
	});
	const client = createClient({ fetch, cookies });
	let prismicData = null;
	try {
		prismicData = await client.getByUID("collection_page", handle)
	} catch (error) {
		console.error("no data on prismic")
	}
	return { collection, prismicData };
}
