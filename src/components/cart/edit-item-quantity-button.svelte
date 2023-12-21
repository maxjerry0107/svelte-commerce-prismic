<script lang="ts">
	import { page } from '$app/stores';
	import { removeFromCart, updateCart } from '$lib/shopify';
	import type { CartItem } from '$lib/shopify/types';
	import clsx from 'clsx';
	import { Icon, Minus, Plus } from 'svelte-hero-icons';
	import LoadingDots from '../loading-dots.svelte';

	export let item: CartItem;
	export let type: 'plus' | 'minus';

	const cartId = $page.data.cartId;
	let pending = false;
	let message = '';

	const onClick = async () => {
		const lineId = item.id;
		const variantId = item.merchandise.id;
		const quantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
		if (!pending) {
			if (!cartId) {
				message = 'Missing cart ID';
			}
			try {
				if (quantity === 0) {
					pending = true;
					await removeFromCart(cartId, [lineId]);
					pending = false;
					return;
				}

				pending = true;
				await updateCart(cartId, [
					{
						id: lineId,
						merchandiseId: variantId,
						quantity
					}
				]);
				pending = false;
			} catch (e) {
				message = 'Error updating item quantity';
				pending = false;
			}
		}
	};
</script>

<div>
	<button
		on:click={onClick}
		aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
		aria-disabled={pending}
		class={clsx(
			'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
			{
				'cursor-not-allowed': pending,
				'ml-auto': type === 'minus'
			}
		)}
	>
		{#if pending}
			<LoadingDots className="bg-black " />
		{:else if type === 'plus'}
			<Icon src={Plus} class="h-4 w-4 " />
		{:else}
			<Icon src={Minus} class="h-4 w-4 " />
		{/if}
	</button>
	<p aria-live="polite" class="sr-only" role="status">
		{message}
	</p>
</div>
