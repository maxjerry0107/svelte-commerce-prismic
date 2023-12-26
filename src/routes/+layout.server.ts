import { getMenu } from '$lib/shopify';

export async function load({ locals }) {
	const { customer } = locals;
	return {
		customer,
		headerMenu: await getMenu(import.meta.env.VITE_STORE_HEADER_MENU)
	};
}
