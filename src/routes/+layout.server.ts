import { getMenu } from '$lib/shopify';

export async function load() {
	return {
		headerMenu: await getMenu(import.meta.env.VITE_STORE_HEADER_MENU)
	};
}
