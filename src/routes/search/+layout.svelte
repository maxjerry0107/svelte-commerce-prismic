<script>
	import Collections from '$lib/components/layout/search/collections.svelte';
	import Filter from '$lib/components/layout/search/filter/filter.svelte';
	import { sorting } from '$lib/constants';

	export let data;
</script>

<div
	class="mx-auto flex max-w-screen-2xl flex-col gap-y-2 gap-x-8 px-4 pb-4 text-black md:flex-row"
>
	<div class="order-first w-full flex-none md:max-w-[125px]">
		<Collections collections={data.collections} />
	</div>
	<div class="order-last min-h-screen w-full md:order-none">
		<slot />
	</div>
	<div class="order-none flex-none md:order-last md:w-[125px]">
		<Filter list={sorting} title="Sort by" />
	</div>
</div>
