<script lang="ts">
	import type { CartItem } from '$lib/shopify/types';
	import { deleteCartItemAction } from '$lib/stores';
	import clsx from 'clsx';
	import { Icon, XMark } from 'svelte-hero-icons';
	import LoadingDots from '../loading-dots.svelte';

	export let item: CartItem;

	let pending = false;
	let message: string | undefined = '';

	const onClick = async () => {
		const itemId = item.id;
		pending = true;
		message = await deleteCartItemAction({ itemId });
		pending = false;
	};
</script>

<div>
	<button
		on:click={onClick}
		aria-label="Remove cart item"
		aria-disabled={pending}
		class={clsx(
			'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
			{
				'cursor-not-allowed px-0': pending
			}
		)}
	>
		{#if pending}
			<LoadingDots className="bg-white" />
		{:else}
			<Icon src={XMark} class="hover:text-accent-3 mx-[1px] h-4 w-4 text-white " />
		{/if}
	</button>
	<p aria-live="polite" class="sr-only" role="status">
		{message}
	</p>
</div>
