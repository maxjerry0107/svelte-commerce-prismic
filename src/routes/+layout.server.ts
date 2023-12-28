import { createClient } from '$lib/prismicio.js';

export async function load({ locals, cookies, fetch }) {
	const { customer } = locals;
	const client = createClient({ fetch, cookies });
	const headerMenu = (await client.getByUID("menu", "header-menu")).data.item;
	const footerMenu = (await client.getByUID("menu", "footer-menu")).data.item;
	return {
		customer,
		headerMenu,
		footerMenu
	};
}
