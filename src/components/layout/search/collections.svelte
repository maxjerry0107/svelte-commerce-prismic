<script lang="ts">
	import type { Collection } from '$lib/shopify/types';
	import Filter from './filter/filter.svelte';

	export let collections: Collection[];
</script>

<Filter list={collections} title="Collections" />
