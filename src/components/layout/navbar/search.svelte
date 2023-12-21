<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createUrl } from '$lib/utils';
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
	$: searchParams = $page.url.searchParams;
	$: searchVal = searchParams.get('q');
	let searchRef: HTMLInputElement;
	const onSubmit = () => {
		if (searchRef.value) {
			searchParams.set('q', searchRef.value);
		} else {
			searchParams.delete('q');
		}
		goto(createUrl('/search', searchParams), { invalidateAll: true });
	};
</script>

<form on:submit|preventDefault={onSubmit} class="w-max-[550px] relative w-full lg:w-80 xl:w-full">
	<input
		type="text"
		name="search"
		placeholder="Search for products..."
		bind:this={searchRef}
		value={searchVal}
		autoComplete="off"
		class="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
	/>
	<div class="absolute right-0 top-0 mr-3 flex h-full items-center">
		<Icon src={MagnifyingGlass} class="h-4" />
	</div>
</form>
