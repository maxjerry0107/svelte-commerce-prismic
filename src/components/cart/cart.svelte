<script lang="ts">
	import { page } from '$app/stores';

	import { getCart } from '$lib/shopify';
	import CartModal from './cart-modal.svelte';
	import OpenCart from './open-cart.svelte';
	const cartId = $page.data.cartId;
	let cartLoading = getCart(cartId);
</script>

{#await cartLoading}
	<OpenCart />
{:then cart}
	<CartModal {cart} />
{/await}
