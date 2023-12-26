<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/actions';
	import { user } from '$lib/stores';
	const onLogOutClicked = async () => {
		await logout();
		goto('/signin');
	};
</script>

<p>{$user?.displayName}</p>

<button on:click={onLogOutClicked}>Log out</button>
