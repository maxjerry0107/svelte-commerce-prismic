<script>
	import { MetaTags } from 'svelte-meta-tags';

	import MySliceZone from '$lib/components/my-slice-zone.svelte';

	export let data;
</script>

<MetaTags
	title="Demo Store"
	description="High-performance ecommerce store built with Sveltekit, Prismic.io, and Shopify."
/>
<MySliceZone slices={data.page.data.slices} />
