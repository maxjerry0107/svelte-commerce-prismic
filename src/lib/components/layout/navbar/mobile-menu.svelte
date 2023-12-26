<script lang="ts">
	import { page } from '$app/stores';
	import { createDialog } from 'svelte-headlessui';
	import { Bars3, Icon, XMark } from 'svelte-hero-icons';
	import Transition from 'svelte-transition';
	import Search from './search.svelte';
	const dialog = createDialog({ label: 'Mobile Menu' });
	const openMobileMenu = () => dialog.open();
	const closeMobileMenu = () => dialog.close();
	const menu = $page.data.headerMenu;
	let innerWidth: number;
	$: if (innerWidth > 768) {
		dialog.close();
	}
</script>

<svelte:window bind:innerWidth />
<button
	on:click={openMobileMenu}
	aria-label="Open mobile menu"
	class="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
>
	<Icon src={Bars3} class="h-4" />
</button>
<Transition show={$dialog.expanded}>
	<div class="relative z-50">
		<Transition
			enter="transition-all ease-in-out duration-300"
			enterFrom="opacity-0 backdrop-blur-none"
			enterTo="opacity-100 backdrop-blur-[.5px]"
			leave="transition-all ease-in-out duration-200"
			leaveFrom="opacity-100 backdrop-blur-[.5px]"
			leaveTo="opacity-0 backdrop-blur-none"
		>
			<div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>
		</Transition>
		<Transition
			enter="transition-all ease-in-out duration-300"
			enterFrom="translate-x-[-100%]"
			enterTo="translate-x-0"
			leave="transition-all ease-in-out duration-200"
			leaveFrom="translate-x-0"
			leaveTo="translate-x-[-100%]"
		>
			<div class="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6">
				<div class="p-4">
					<button
						class="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
						on:click={closeMobileMenu}
						aria-label="Close mobile menu"
					>
						<Icon src={XMark} class="h-6" />
					</button>
					<div class="mb-4 w-full">
						<Search />
					</div>
					{#if menu.length > 0}
						<ul class="flex w-full flex-col">
							{#each menu as item}
								<li class="my-2">
									<a
										href={item.path}
										on:click={closeMobileMenu}
										data-sveltekit-prefetch
										class="py-2 text-xl text-black transition-colors hover:text-neutral-500"
									>
										{item.title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</Transition>
	</div>
</Transition>
