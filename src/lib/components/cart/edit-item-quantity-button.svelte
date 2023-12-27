<script lang="ts">
	import { updateCartItem } from '$lib/actions/cart';
	import clsx from 'clsx';
	import { createForm } from 'svelte-forms-lib';
	import { Icon, Minus, Plus } from 'svelte-hero-icons';
	import type { CheckoutLineItem } from '../../../types/shopify';
	import LoadingDots from '../loading-dots.svelte';

	export let item: CheckoutLineItem;
	export let type: 'plus' | 'minus';

	const { isSubmitting, handleSubmit } = createForm({
		initialValues: {},
		onSubmit: async () => {
			const lineId = item.id;
			const quantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
			await updateCartItem({ lineId, quantity });
		}
	});
</script>

<form method="post" on:submit={handleSubmit}>
	<button
		type="submit"
		aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
		aria-disabled={$isSubmitting}
		class={clsx(
			'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
			{
				'cursor-not-allowed': $isSubmitting,
				'ml-auto': type === 'minus'
			}
		)}
	>
		{#if $isSubmitting}
			<LoadingDots class="bg-black " />
		{:else if type === 'plus'}
			<Icon src={Plus} class="h-4 w-4 " />
		{:else}
			<Icon src={Minus} class="h-4 w-4 " />
		{/if}
	</button>
</form>
