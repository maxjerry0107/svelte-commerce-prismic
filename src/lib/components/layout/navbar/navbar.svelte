<script lang="ts">
	import { page } from '$app/stores';
	import { loadCart } from '$lib/actions/cart';
	import { cart } from '$lib/stores';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import Account from '../../account/account.svelte';
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
		<div class="flex w-full md:w-1/3 items-start">
			<a
				href="/"
				data-sveltekit-prefetch
				class="ml-2 *:mr-2 flex items-center justify-center md:w-auto lg:mr-6"
			>
				<Logo />
				<div class="ml-2 flex-none text-sm font-medium uppercase block">
					{SITE_NAME}
				</div>
			</a>
		</div>
		<div class="hidden justify-center md:flex md:w-1/3">
			<Search />
		</div>
		<div class="flex justify-end md:w-1/3 gap-x-2">
			<Account />
			<Cart cart={$cart} />
		</div>
	</div>
</nav>
<nav class="hidden sm:flex items-center justify-center sm:mb-4">
	<div>
		{#if menu.length > 0}
			<ul class="gap-6 text-sm flex items-center">
				{#each menu as item}
					<li>
						<a
							href={item.path}
							class={clsx('text-neutral-500 underline-offset-4 hover:text-black hover:underline', {
								'font-bold text-black': item.path === $page.url.pathname
							})}
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</nav>
