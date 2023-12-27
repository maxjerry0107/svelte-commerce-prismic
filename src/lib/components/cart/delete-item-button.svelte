<script lang="ts">
	import { deleteCartItem } from '$lib/actions/cart';
	import clsx from 'clsx';
	import { createForm } from 'svelte-forms-lib';
	import { Icon, XMark } from 'svelte-hero-icons';
	import type { CheckoutLineItem } from '../../../types/shopify';
	import LoadingDots from '../loading-dots.svelte';

	export let item: CheckoutLineItem;

	const { isSubmitting, handleSubmit } = createForm({
		initialValues: {},
		onSubmit: async () => {
			await deleteCartItem({ itemId: item.id });
		}
	});
</script>

<form method="post" on:submit={handleSubmit}>
	<button
		type="submit"
		aria-label="Remove cart item"
		aria-disabled={$isSubmitting}
		class={clsx(
			'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
			{
				'cursor-not-allowed px-0': $isSubmitting
			}
		)}
	>
		{#if $isSubmitting}
			<LoadingDots class="bg-white" />
		{:else}
			<Icon src={XMark} class="hover:text-accent-3 mx-[1px] h-4 w-4 text-white " />
		{/if}
	</button>
</form>
