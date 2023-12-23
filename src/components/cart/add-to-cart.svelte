<script lang="ts">
	import { page } from '$app/stores';
	import type { ProductVariant } from '$lib/shopify/types';
	import { addToCartAction } from '$lib/stores';
	import clsx from 'clsx';
	import { Icon, Plus } from 'svelte-hero-icons';
	import LoadingDots from '../loading-dots.svelte';

	export let availableForSale: boolean;
	export let variants: ProductVariant[];
	let pending = false;
	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';
	let message: string | undefined = '';

	$: searchParams = $page.url.searchParams;
	$: defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
	$: variant = variants.find((variant: ProductVariant) =>
		variant.selectedOptions.every(
			(option) => option.value === searchParams.get(option.name.toLowerCase())
		)
	);
	$: selectedVariantId = variant?.id || defaultVariantId;

	const addToCartClicked = async () => {
		if (!selectedVariantId) {
			message = 'Missing product variant ID';
			return;
		}
		pending = true;
		message = await addToCartAction({ selectedVariantId });
		pending = false;
	};
</script>

{#if !availableForSale}
	<button aria-disabled class={clsx(buttonClasses, disabledClasses)}> Out Of Stock </button>
{:else if !selectedVariantId}
	<button
		aria-label="Please select an option"
		aria-disabled
		class={clsx(buttonClasses, disabledClasses)}
	>
		<div class="absolute left-0 ml-4">
			<Icon src={Plus} class="w-5 h-5" />
		</div>
		Add To Cart
	</button>
{:else}
	<button
		aria-label="Add to cart"
		aria-disabled={pending}
		class={clsx(buttonClasses, {
			'hover:opacity-90': true,
			disabledClasses: pending
		})}
		on:click={addToCartClicked}
	>
		<div class="absolute left-0 ml-4">
			{#if pending}
				<LoadingDots className="mb-3 bg-white" />
			{:else}
				<Icon src={Plus} class="h-5" />
			{/if}
		</div>
		Add To Cart
	</button>
{/if}
<p aria-live="polite" class="sr-only" role="status">
	{message}
</p>
