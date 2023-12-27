<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/actions';
	import { MetaTags } from 'svelte-meta-tags';
	const onLogOutClicked = async () => {
		await logout();
		goto('/signin');
	};
</script>

<MetaTags title="Account" />

<div class="container flex max-w-4xl flex-col px-6 py-8">
	<button class="self-end" on:click={onLogOutClicked}>Log out</button>
	<div class="flex flex-row gap-x-4 py-8">
		<div class="flex w-full max-w-40 flex-col items-center gap-y-2">
			<a href="/account/">Profile</a>
			<a href="/account/address">Address</a>
			<a href="/account/orders">Order</a>
		</div>
		<div class="flex flex-1 flex-col items-center justify-center">
			<slot />
		</div>
	</div>
</div>
