import { defaultSort, sorting } from '$lib/constants';
import { getCollection, getCollectionProducts } from '$lib/shopify';

export async function load({ params, url }) {
	const sort = url.searchParams.get('sort');
	const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
	const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
	const collection = await getCollection(params.collection);
	return { products, collection };
}
