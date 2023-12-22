<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ProductOption, VariantCombination } from '$lib/shopify/types';
	import { createUrl } from '$lib/utils';
	import clsx from 'clsx';

	export let options: ProductOption[];
	export let option: ProductOption;
	export let value: string;
	export let combinations: VariantCombination[];

	$: pathname = $page.url.pathname;

	const optionNameLowerCase = option.name.toLowerCase();

	$: optionSearchParams = new URLSearchParams($page.url.searchParams.toString());
	$: optionSearchParams.set(optionNameLowerCase, value);
	$: optionUrl = createUrl(pathname, optionSearchParams);

	$: filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
		options.find((option) => option.name.toLowerCase() === key && option.values.includes(value))
	);
	$: isAvailableForSale = combinations.find((combination) =>
		filtered.every(([key, value]) => combination[key] === value && combination.availableForSale)
	);

	// The option is active if it's in the url params.
	$: isActive = $page.url.searchParams.get(optionNameLowerCase) === value;
</script>

<button
	aria-disabled={!isAvailableForSale}
	disabled={!isAvailableForSale}
	on:click={() => {
		goto(optionUrl, { noScroll: true });
	}}
	title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
	class={clsx(
		'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
		{
			'cursor-default ring-2 ring-blue-600': isActive,
			'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
				!isActive && isAvailableForSale,
			'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
				!isAvailableForSale
		}
	)}
>
	{value}
</button>
