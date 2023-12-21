import { defaultSort, sorting } from '$lib/constants';
import { getProducts } from '$lib/shopify';

export async function load({ url }) {
	const sort = url.searchParams.get('sort');
	const searchValue = url.searchParams.get('q') || '';
	const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
	const products = await getProducts({ sortKey, reverse, query: searchValue });
	return { products, searchValue };
}
