<script lang="ts">
	import { checkout } from '$lib/actions';
	import { DEFAULT_OPTION } from '$lib/constants';
	import type { Cart } from '$lib/shopify/types';
	import { user } from '$lib/stores';
	import { createUrl } from '$lib/utils';
	import { createForm } from 'svelte-forms-lib';
	import { createDialog } from 'svelte-headlessui';
	import { Icon, ShoppingCart } from 'svelte-hero-icons';
	import Transition from 'svelte-transition';
	import type { CheckoutLineItem } from '../../../types/shopify';
	import Close from '../close.svelte';
	import LoadingDots from '../loading-dots.svelte';
	import Price from '../price.svelte';
	import DeleteItemButton from './delete-item-button.svelte';
	import EditItemQuantityButton from './edit-item-quantity-button.svelte';
	import OpenCart from './open-cart.svelte';
	const dialog = createDialog({ label: 'Cart Modal' });
	const openCart = () => dialog.open();
	const closeCart = () => dialog.close();
	export let cart: Cart | null = null;
	let cartQuantity = cart?.totalQuantity;

	$: if (cart?.totalQuantity !== cartQuantity) {
		if (cartQuantity != undefined && !$dialog.expanded) openCart();
		cartQuantity = cart?.totalQuantity;
	}

	type MerchandiseSearchParams = {
		[key: string]: string;
	};
	const getMerchandiseUrl = (item: CheckoutLineItem) => {
		const merchandiseSearchParams: MerchandiseSearchParams = {};
		item.variant?.selectedOptions?.forEach(({ name, value }) => {
			if (value !== DEFAULT_OPTION) {
				merchandiseSearchParams[name.toLowerCase()] = value;
			}
		});
		const merchandiseUrl = createUrl(
			`/product/${item?.variant?.product?.handle}`,
			new URLSearchParams(merchandiseSearchParams)
		);
		return merchandiseUrl;
	};

	const { isSubmitting, handleSubmit } = createForm({
		initialValues: {},
		onSubmit: async () => {
			if ($user) {
				const url = await checkout();
				document.location.href = url;
			}
			window.location.href = cart?.checkoutUrl || '#';
		}
	});
</script>

<button aria-label="Open cart" on:click={openCart}>
	<OpenCart quantity={cart?.totalQuantity} />
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
			<div on:click={closeCart} class="fixed inset-0 bg-black/30" aria-hidden="true" />
		</Transition>
		<Transition
			enter="transition-all ease-in-out duration-300"
			enterFrom="translate-x-full"
			enterTo="translate-x-0"
			leave="transition-all ease-in-out duration-200"
			leaveFrom="translate-x-0"
			leaveTo="translate-x-full"
		>
			<div
				class="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px]"
			>
				<div class="flex items-center justify-between">
					<p class="text-lg font-semibold">My Cart</p>

					<button aria-label="Close cart" on:click={closeCart}>
						<Close />
					</button>
				</div>
				{#if !cart || cart.lines.length === 0}
					<div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
						<Icon src={ShoppingCart} class="h-16" />
						<p class="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
					</div>
				{:else}
					<div class="flex h-full flex-col justify-between overflow-hidden p-1">
						<ul class="flex-grow overflow-auto py-4">
							{#each cart.lines as item}
								{@const merchandiseUrl = getMerchandiseUrl(item)}
								<li class="flex w-full flex-col border-b border-neutral-300">
									<div class="relative flex w-full flex-row justify-between px-1 py-4">
										<div class="absolute z-40 -mt-2 ml-[55px]">
											<DeleteItemButton {item} />
										</div>
										<a
											href={merchandiseUrl}
											on:click={closeCart}
											class="z-30 flex flex-row space-x-4"
										>
											<div
												class="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300"
											>
												<img
													class="h-full w-full object-cover"
													width={64}
													height={64}
													alt={item?.variant?.image?.altText || item?.variant?.product?.title}
													src={item?.variant?.image?.url}
												/>
											</div>

											<div class="flex flex-1 flex-col text-base">
												<span class="leading-tight">
													{item?.title}
												</span>
												{#if item?.variant?.title !== DEFAULT_OPTION}
													<p class="text-sm text-neutral-500">
														{item?.variant?.title}
													</p>
												{/if}
											</div>
										</a>
										<div class="flex h-16 flex-col justify-between">
											<Price
												class="flex justify-end space-y-2 text-right text-sm"
												amount={(item.variant?.priceV2?.amount * item.quantity).toString()}
												currencyCode={item.variant?.priceV2?.currencyCode}
											/>
											<div
												class="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200"
											>
												<EditItemQuantityButton {item} type="minus" />
												<p class="w-6 text-center">
													<span class="w-full text-sm">{item.quantity}</span>
												</p>
												<EditItemQuantityButton {item} type="plus" />
											</div>
										</div>
									</div>
								</li>
							{/each}
						</ul>
						<div class="py-4 text-sm text-neutral-500">
							<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
								<p>Taxes</p>
								<Price
									class="text-right text-base text-black "
									amount={cart.cost.totalTaxAmount.amount}
									currencyCode={cart.cost.totalTaxAmount.currencyCode}
								/>
							</div>
							<div
								class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1"
							>
								<p>Shipping</p>
								<p class="text-right">Calculated at checkout</p>
							</div>
							<div
								class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1"
							>
								<p>Total</p>
								<Price
									class="text-right text-base text-black "
									amount={cart.cost.totalAmount.amount}
									currencyCode={cart.cost.totalAmount.currencyCode}
								/>
							</div>
						</div>
						<form on:submit={handleSubmit}>
							<button
								type="submit"
								class="block w-full rounded-full bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
							>
								{#if $isSubmitting}
									<LoadingDots class="bg-white" />
								{:else}
									Proceed to Checkout
								{/if}
							</button>
						</form>
					</div>
				{/if}
			</div>
		</Transition>
	</div>
</Transition>
