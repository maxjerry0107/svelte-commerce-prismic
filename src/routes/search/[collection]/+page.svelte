<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import Grid from '../../../components/grid/grid.svelte';
	import ProductGridItems from '../../../components/layout/product-grid-items.svelte';

	export let data;
	$: products = data.products;
	$: collection = data.collection;
</script>

<MetaTags
	title={collection?.seo?.title || collection?.title}
	description={collection?.seo?.description ||
		collection?.description ||
		`${collection?.title} products`}
/>

{#if products.length === 0}
	<p class="py-3 text-lg">{`No products found in this collection`}</p>
{:else}
	<Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		<ProductGridItems {products} />
	</Grid>
{/if}
