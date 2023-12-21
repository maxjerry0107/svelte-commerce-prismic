<script lang="ts">
	import { page } from '$app/stores';
	import type { ListItem } from '$lib/constants';
	import { onMount } from 'svelte';
	import { ChevronDown, Icon } from 'svelte-hero-icons';
	import FilterItem from './filter-item.svelte';
	export let list: ListItem[];

	let active = '';
	let openSelect = false;
	let ref: HTMLDivElement;

	$: list.forEach((listItem: ListItem) => {
		if (
			('path' in listItem && $page.url.pathname === listItem.path) ||
			('slug' in listItem && $page.url.searchParams.get('sort') === listItem.slug)
		) {
			active = listItem.title;
		}
	});

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref && !ref.contains(event.target as Node)) {
				openSelect = false;
			}
		};

		window.addEventListener('click', handleClickOutside);
		return () => window.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative" bind:this={ref}>
	<button
		on:click={() => {
			openSelect = !openSelect;
		}}
		class="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30"
	>
		<div>{active}</div>
		<Icon src={ChevronDown} class="w-4 h-4" />
	</button>
	{#if openSelect}
		<button
			on:click={() => {
				openSelect = false;
			}}
			class="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
		>
			{#each list as item}
				<FilterItem {item} />
			{/each}
		</button>
	{/if}
</div>
