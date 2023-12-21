<script lang="ts">
	import type { ListItem } from '$lib/constants';
	import FilterItemDropdown from './filter-item-dropdown.svelte';
	import FilterItem from './filter-item.svelte';

	export let title: string;
	export let list: ListItem[];
</script>

<nav>
	{#if title}
		<h3 class="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
			{title}
		</h3>
	{/if}

	<ul class="hidden md:block">
		{#each list as item}
			<FilterItem {item} />
		{/each}
	</ul>
	<ul class="md:hidden">
		<FilterItemDropdown {list} />
	</ul>
</nav>
