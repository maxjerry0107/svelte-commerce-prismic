<script>
	import { Icon, User } from 'svelte-hero-icons';
</script>

<a
	class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
	aria-label="Account"
	href="/account"
>
	<Icon src={User} class="h-4 transition-all ease-in-out hover:scale-110" />
</a>
