<script lang="ts">
	import ProductGridItems from '$lib/components/layout/product-grid-items.svelte';
	import MySliceZone from '$lib/components/my-slice-zone.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;
	$: collection = data.collection;
	$: slices = data.prismicData?.data?.slices;
</script>

<MetaTags
	title={collection?.seo?.title || collection?.title}
	description={collection?.seo?.description ||
		collection?.description ||
		`${collection?.title} products`}
/>

{#if collection?.products.length === 0}
	<p class="py-3 text-lg">{`No products found in this collection`}</p>
{:else}
	<MySliceZone {slices}>
		<ProductGridItems products={collection?.products} />
	</MySliceZone>
{/if}
