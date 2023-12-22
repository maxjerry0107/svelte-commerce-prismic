<script lang="ts">
	import type { ProductOption, ProductVariant } from '$lib/shopify/types';
	import VariantSelectorButton from './variant-selector-button.svelte';

	export let options: ProductOption[];
	export let variants: ProductVariant[];

	const hasNoOptionsOrJustOneOption =
		!options.length || (options.length === 1 && options[0]?.values.length === 1);

	const combinations = variants.map((variant) => ({
		id: variant.id,
		availableForSale: variant.availableForSale,
		// Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
		...variant.selectedOptions.reduce(
			(accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
			{}
		)
	}));
</script>

{#if !hasNoOptionsOrJustOneOption}
	{#each options as option}
		<dl class="mb-8">
			<dt class="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
			<dd class="flex flex-wrap gap-3">
				{#each option.values as value}
					<VariantSelectorButton {option} {options} {value} {combinations} />
				{/each}
			</dd>
		</dl>
	{/each}
{/if}
