<script lang="ts">
	import Link from '../link.svelte';

	const SIDEBAR_ITEMS = [
		{
			title: 'Profile',
			path: '/account'
		},
		{
			title: 'Address',
			path: '/account/address'
		},
		{
			title: 'Order',
			path: '/account/order'
		}
	];
</script>

<div class="flex w-full max-w-40 flex-col items-center gap-y-2">
	{#each SIDEBAR_ITEMS as item}
		<Link {item} />
	{/each}
</div>
