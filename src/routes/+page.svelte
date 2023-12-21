<script>
	import { SliceZone } from '@prismicio/svelte';
	import { MetaTags } from 'svelte-meta-tags';

	import { components } from '$lib/slices';

	export let data;
</script>

<MetaTags
	title="Demo Store"
	description="High-performance ecommerce store built with Sveltekit, Prismic.io, and Shopify."
/>
<SliceZone slices={data.page.data.slices} {components} />
