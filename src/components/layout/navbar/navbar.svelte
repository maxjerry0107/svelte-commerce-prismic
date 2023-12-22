<script lang="ts">
	import { page } from '$app/stores';
	import { cart, loadCart } from '$lib/stores';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import CartModal from '../../cart/cart-modal.svelte';
	import Logo from '../logo.svelte';
	import MobileMenu from './mobile-menu.svelte';
	import Search from './search.svelte';
	const SITE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
	const menu = $page.data.headerMenu;
	onMount(() => {
		loadCart();
	});
</script>

<nav class="relative flex items-center justify-between p-4 lg:px-6">
	<div class="block flex-none md:hidden">
		<MobileMenu />
	</div>
	<div class="flex w-full items-center">
		<div class="flex w-full md:w-1/3">
			<a
				href="/"
				data-sveltekit-prefetch
				class="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
			>
				<Logo />
				<div class="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
					{SITE_NAME}
				</div>
			</a>
			{#if menu.length > 0}
				<ul class="hidden gap-6 text-sm md:flex md:items-center">
					{#each menu as item}
						<li>
							<a
								href={item.path}
								class={clsx(
									'text-neutral-500 underline-offset-4 hover:text-black hover:underline',
									{ 'font-bold text-black': item.path === $page.url.pathname }
								)}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="hidden justify-center md:flex md:w-1/3">
			<Search />
		</div>
		<div class="flex justify-end md:w-1/3">
			<CartModal cart={$cart} />
		</div>
	</div>
</nav>
