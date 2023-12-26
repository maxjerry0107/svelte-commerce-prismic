<script lang="ts">
	import { browser } from '$app/environment';
	import type { Product } from '$lib/shopify/types';
	import Carousel from 'svelte-carousel';
	import GridItem from '../grid/grid-item.svelte';
	import GridTile from '../grid/grid-tile.svelte';
	export let relatedProducts: Product[];
	let particlesToShow = 4;
	let innerWidth: number;
	$: if (innerWidth > 1200) particlesToShow = 4;
	else if (innerWidth > 768) particlesToShow = 3;
	else if (innerWidth > 430) particlesToShow = 2;
	else particlesToShow = 1;
</script>

<svelte:window bind:innerWidth />
<div class="px-4 py-8">
	<h2 class="mb-4 text-2xl font-bold">Related Products</h2>
	{#if browser}
		{#if relatedProducts.length > 0}
			<ul class="mt-4">
				<Carousel let:loaded {particlesToShow} particlesToScroll={1}>
					{#each relatedProducts as product, imageIndex (product)}
						<GridItem className="animate-fadeIn p-2">
							<a class="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
								{#if loaded.includes(imageIndex)}
									<GridTile
										alt={product.title}
										label={{
											title: product.title,
											amount: product.priceRange.maxVariantPrice.amount,
											currencyCode: product.priceRange.maxVariantPrice.currencyCode
										}}
										src={product.featuredImage?.url}
									/>
								{/if}
							</a>
						</GridItem>
					{/each}
				</Carousel>
			</ul>
		{/if}
	{/if}
</div>
