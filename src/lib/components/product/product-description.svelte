<script lang="ts">
	import { page } from '$app/stores';
	import type { Product, ProductVariant } from '$lib/shopify/types';
	import AddToCart from '../cart/add-to-cart.svelte';
	import Price from '../price.svelte';
	import Prose from '../prose.svelte';
	import VariantSelector from './variant-selector.svelte';

	export let product: Product | undefined;

	$: variants = product?.variants;
	$: searchParams = $page.url.searchParams;
	$: defaultVariantId = variants?.length === 1 ? variants[0]?.id : undefined;
	$: selectedVariant = variants?.find((variant: ProductVariant) =>
		variant.selectedOptions.every(
			(option) => option.value === searchParams.get(option.name.toLowerCase())
		)
	);
	$: selectedVariantId = selectedVariant?.id || defaultVariantId;
</script>

{#if product}
	<div class="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
		<h1 class="mb-5 text-5xl font-medium">{product.title}</h1>
		<div class="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
			<Price
				amount={selectedVariant?.price.amount || product.priceRange.maxVariantPrice.amount}
				currencyCode={selectedVariant?.price.currencyCode ||
					product.priceRange.maxVariantPrice.currencyCode}
			/>
		</div>
	</div>
	<VariantSelector options={product.options} variants={product.variants} />

	{#if product.descriptionHtml}
		<Prose
			className="mb-6 text-sm leading-tight dark:text-white/[60%]"
			html={product.descriptionHtml}
		/>
	{/if}

	<AddToCart {selectedVariantId} availableForSale={product.availableForSale} />
{/if}
