<script lang="ts">
	import { getMenu } from '$lib/shopify';
	import Logo from '../logo.svelte';
	import FooterMenuItem from './footer-menu-item.svelte';
	const currentYear = new Date().getFullYear();
	const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
	const skeleton = 'w-full h-4 animate-pulse rounded bg-neutral-200';
	let menuPromise = getMenu(import.meta.env.VITE_STORE_FOOTER_MENU);
	const SITE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
</script>

<footer class="text-sm text-neutral-500">
	<div
		class="flex w-full flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 lg:px-6"
	>
		<div>
			<a class="flex items-center gap-2 text-black md:pt-1" href="/">
				<Logo />
				<span class="uppercase">{SITE_NAME}</span>
			</a>
		</div>
		{#await menuPromise}
			<div class="flex h-[188px] w-[200px] flex-col gap-2">
				<div class={skeleton} />
				<div class={skeleton} />
				<div class={skeleton} />
				<div class={skeleton} />
			</div>
		{:then menu}
			<nav>
				<ul>
					{#each menu as item}
						<FooterMenuItem {item} />
					{/each}
				</ul>
			</nav>
		{/await}
	</div>
	<div class="border-t border-neutral-200 py-6 text-sm">
		<div
			class="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0"
		>
			<p>
				&copy; {copyrightDate}
				{SITE_NAME}
				{SITE_NAME.length && !SITE_NAME.endsWith('.') ? '.' : ''} All rights reserved.
			</p>
		</div>
	</div>
</footer>
