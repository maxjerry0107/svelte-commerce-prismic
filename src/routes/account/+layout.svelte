<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/actions';
	import AccountSidebar from '$lib/components/account/account-sidebar.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	const onLogOutClicked = async () => {
		await logout();
		goto('/signin');
	};
</script>

<MetaTags title="Account" />

<div class="container flex max-w-5xl flex-col px-6 py-8">
	<button class="self-end" on:click={onLogOutClicked}>Log out</button>
	<div class="flex flex-row gap-x-4 py-8">
		<AccountSidebar />
		<div class="flex min-h-96 flex-1 flex-col items-center">
			<slot />
		</div>
	</div>
</div>
