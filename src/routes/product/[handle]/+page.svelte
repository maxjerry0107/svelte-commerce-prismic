<script lang="ts">
	import type { Image } from '$lib/shopify/types.js';
	import { MetaTags } from 'svelte-meta-tags';
	import Gallery from '../../../components/product/gallery.svelte';
	import ProductDescription from '../../../components/product/product-description.svelte';

	export let data;
	const product = data.product;
	const productJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product?.title,
		description: product?.description,
		image: product?.featuredImage.url,
		offers: {
			'@type': 'AggregateOffer',
			availability: product?.availableForSale
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock',
			priceCurrency: product?.priceRange.minVariantPrice.currencyCode,
			highPrice: product?.priceRange.maxVariantPrice.amount,
			lowPrice: product?.priceRange.minVariantPrice.amount
		}
	};
	const images =
		product?.images.map((image: Image) => ({
			src: image.url,
			altText: image.altText
		})) || [];

	const { url, width, height, altText: alt } = product?.featuredImage || {};
</script>

<MetaTags
	title={product?.seo.title || product?.title}
	description={product?.seo.description || product?.description}
	openGraph={url
		? {
				images: [
					{
						url,
						width,
						height,
						alt
					}
				]
			}
		: undefined}
/>

{@html '<script type="application/ld+json">' + JSON.stringify(productJsonLd) + '</script>'}

<div class="mx-auto max-w-screen-2xl px-4">
	<div
		class="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8"
	>
		<div class="h-full w-full basis-full lg:basis-4/6">
			<Gallery {images} />
		</div>

		<div class="basis-full lg:basis-2/6">
			<ProductDescription {product} />
		</div>
	</div>
	<!-- <RelatedProducts id={product.id} /> -->
</div>
