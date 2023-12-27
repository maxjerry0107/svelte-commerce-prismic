<script lang="ts">
	import { addToCart } from '$lib/actions/cart';
	import clsx from 'clsx';
	import { createForm } from 'svelte-forms-lib';
	import { Icon, Plus } from 'svelte-hero-icons';
	import LoadingDots from '../loading-dots.svelte';

	export let availableForSale: boolean;
	export let selectedVariantId: string | undefined;

	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

	const { isSubmitting, handleSubmit } = createForm({
		initialValues: {},
		onSubmit: async () => {
			if (selectedVariantId) {
				await addToCart({ selectedVariantId });
			}
		}
	});
</script>

{#if !availableForSale}
	<button aria-disabled class={clsx(buttonClasses, disabledClasses)}> Out Of Stock </button>
{:else if !selectedVariantId}
	<button
		aria-label="Please select an option"
		aria-disabled
		class={clsx(buttonClasses, disabledClasses)}
	>
		<div class="absolute left-0 ml-4">
			<Icon src={Plus} class="h-5 w-5" />
		</div>
		Add To Cart
	</button>
{:else}
	<form method="post" on:submit={handleSubmit}>
		<button
			aria-label="Add to cart"
			aria-disabled={$isSubmitting}
			class={clsx(buttonClasses, {
				'hover:opacity-90': true,
				disabledClasses: $isSubmitting
			})}
			type="submit"
		>
			<div class="absolute left-0 ml-4">
				{#if $isSubmitting}
					<LoadingDots class="mb-3 bg-white" />
				{:else}
					<Icon src={Plus} class="h-5" />
				{/if}
			</div>
			Add To Cart
		</button>
	</form>
{/if}
