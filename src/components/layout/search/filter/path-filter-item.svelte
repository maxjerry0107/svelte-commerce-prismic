<script lang="ts">
	import { page } from '$app/stores';
	import type { PathFilterItem } from '$lib/constants';
	import { createUrl } from '$lib/utils';

	export let item: PathFilterItem;
	const getHref = (searchParams: URLSearchParams) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete('q');
		return createUrl(item.path, newParams);
	};

	$: active = $page.url.pathname === item.path;
	$: href = getHref($page.url.searchParams);
</script>

<li class="mt-2 flex text-black">
	{#if active}
		<p class="w-full text-sm underline-offset-4 underline cursor-pointer">
			{item.title}
		</p>
	{:else}
		<a {href} class="w-full text-sm underline-offset-4 hover:underline">
			{item.title}
		</a>
	{/if}
</li>
