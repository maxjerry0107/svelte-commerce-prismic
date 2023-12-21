import { getMenu } from '$lib/shopify';

export async function load({ cookies }) {
	const cartId = cookies.get('cartId');
	return {
		headerMenu: await getMenu(import.meta.env.VITE_STORE_HEADER_MENU),
		cartId
	};
}
