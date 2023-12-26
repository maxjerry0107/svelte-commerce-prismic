<script lang="ts">
	import type { ListItem } from '$lib/constants';
	import PathFilterItem from './path-filter-item.svelte';
	import SortFilterItem from './sort-filter-item.svelte';

	export let item: ListItem;
</script>

{#if 'path' in item}
	<PathFilterItem {item} />
{:else}
	<SortFilterItem {item} />
{/if}
