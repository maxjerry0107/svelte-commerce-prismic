<script lang="ts">
	import { page } from '$app/stores';
	import type { SortFilterItem } from '$lib/constants';
	import { createUrl } from '$lib/utils';

	export let item: SortFilterItem;
	$: active = $page.url.searchParams.get('sort') === item.slug;
	const q = $page.url.searchParams.get('q');
	const href = createUrl(
		$page.url.pathname,
		new URLSearchParams({
			...(q && { q }),
			...(item.slug && item.slug.length && { sort: item.slug })
		})
	);
</script>

<li class="mt-2 flex text-sm text-black">
	{#if active}
		<p class="w-full underline underline-offset-4 cursor-pointer">
			{item.title}
		</p>
	{:else}
		<a {href} class="w-full hover:underline hover:underline-offset-4">
			{item.title}
		</a>
	{/if}
</li>
