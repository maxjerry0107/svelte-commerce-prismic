<script lang="ts">
	import { browser } from '$app/environment';
	import { getCollectionWithProducts } from '$lib/shopify';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import Carousel from 'svelte-carousel';
	import GridItem from '../../../components/grid/grid-item.svelte';
	import GridTile from '../../../components/grid/grid-tile.svelte';

	export let slice: Content.CollectionSliderSlice;

	const title = slice.primary.title || '';
	const handle = slice.primary.collection_handle || '';

	let collectionPromise = getCollectionWithProducts({ handle });
	let particlesToShow = 4;
	onMount(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width > 1200) particlesToShow = 4;
			else if (width > 768) particlesToShow = 3;
			else if (width > 430) particlesToShow = 2;
			else particlesToShow = 1;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<section
	class="slice-section"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="px-4">
		{#await collectionPromise}
			<h3 class="text-2xl font-bold">{title}</h3>
			<div class="grid grid-cols-4 gap-4 animate-pulse mt-4">
				<div class="bg-slate-200 aspect-square"></div>
				<div class="bg-slate-200 aspect-square"></div>
				<div class="bg-slate-200 aspect-square"></div>
				<div class="bg-slate-200 aspect-square"></div>
			</div>
		{:then collection}
			<h3 class="text-2xl font-bold">{title || collection?.title}</h3>

			{#if browser}
				{#if collection?.products && collection?.products.length > 0}
					<ul class="mt-4">
						<Carousel let:loaded {particlesToShow} particlesToScroll={1}>
							{#each collection?.products as product, imageIndex (product)}
								<GridItem className="animate-fadeIn p-2">
									<a
										class="relative inline-block h-full w-full"
										href={`/product/${product.handle}`}
									>
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
		{/await}
	</div>
</section>
