<script lang="ts">
	import type { Product } from '$lib/shopify/types';
	import GridItem from '../grid/grid-item.svelte';
	import GridTile from '../grid/grid-tile.svelte';
	import Grid from '../grid/grid.svelte';

	export let products: Product[] | undefined;
</script>

<Grid class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
	{#if products}
		{#each products as product}
			<GridItem class="animate-fadeIn">
				<a class="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
					<GridTile
						alt={product.title}
						label={{
							title: product.title,
							amount: product.priceRange.maxVariantPrice.amount,
							currencyCode: product.priceRange.maxVariantPrice.currencyCode
						}}
						src={product.featuredImage?.url}
					/>
				</a>
			</GridItem>
		{/each}
	{/if}
</Grid>
