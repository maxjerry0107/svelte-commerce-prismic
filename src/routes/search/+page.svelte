<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import Grid from '../../components/grid/grid.svelte';
	import ProductGridItems from '../../components/layout/product-grid-items.svelte';

	export let data;
	$: products = data.products;
	$: searchValue = data.searchValue;
	$: resultsText = products.length > 1 ? 'results' : 'result';
</script>

<MetaTags title="Search" description="Search for products in the store." />
{#if searchValue}
	<p class="mb-4">
		{#if products.length === 0}
			There are no products that match
		{:else}
			Showing {products.length} {resultsText} for
		{/if}
		<span class="font-bold">&quot;{searchValue}&quot;</span>
	</p>
{/if}

{#if products.length > 0}
	<Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		<ProductGridItems {products} />
	</Grid>
{/if}
