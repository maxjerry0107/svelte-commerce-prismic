<script lang="ts">
	import { page } from '$app/stores';
	import { loadCart } from '$lib/actions/cart';
	import Link from '$lib/components/link.svelte';
	import { cart } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Icon, User } from 'svelte-hero-icons';
	import Cart from '../../cart/cart.svelte';
	import Logo from '../logo.svelte';
	import MobileMenu from './mobile-menu.svelte';
	import Search from './search.svelte';
	const SITE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
	const menu = $page.data.headerMenu;
	onMount(async () => {
		await loadCart();
	});
</script>

<nav class="relative flex items-center justify-between p-4 lg:px-6">
	<MobileMenu />
	<div class="flex w-full items-center">
		<div class="flex w-full items-start md:w-1/3">
			<a
				href="/"
				data-sveltekit-prefetch
				class="ml-2 flex items-center justify-center *:mr-2 md:w-auto lg:mr-6"
			>
				<Logo />
				<div class="ml-2 block flex-none text-sm font-medium uppercase">
					{SITE_NAME}
				</div>
			</a>
		</div>
		<div class="hidden justify-center md:flex md:w-1/3">
			<Search />
		</div>
		<div class="flex justify-end gap-x-2 md:w-1/3">
			<a
				class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
				aria-label="Account"
				href="/account"
			>
				<Icon src={User} class="h-4 transition-all ease-in-out hover:scale-110" />
			</a>
			<Cart cart={$cart} />
		</div>
	</div>
</nav>
<nav class="hidden items-center justify-center sm:mb-4 sm:flex">
	<div>
		{#if menu.length > 0}
			<ul class="flex items-center gap-6 text-sm">
				{#each menu as item}
					<li>
						<Link {item} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</nav>
