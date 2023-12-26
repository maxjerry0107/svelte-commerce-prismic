<script lang="ts">
	import ProductGridItems from '$lib/components/layout/product-grid-items.svelte';
	import { MetaTags } from 'svelte-meta-tags';

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
	<ProductGridItems {products} />
{/if}
