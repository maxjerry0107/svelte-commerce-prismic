<script lang="ts">
	import clsx from 'clsx';
	import Price from './price.svelte';

	export let title: string;
	export let amount: string = '';
	export let currencyCode: string = '';
	export let position: 'bottom' | 'center';
</script>

<div
	class={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label ', {
		'lg:px-20 lg:pb-[35%]': position === 'center'
	})}
>
	<div
		class="flex w-full items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md"
	>
		<h3 class="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{title}</h3>
		{#if amount}
			<Price
				class="flex-none rounded-full bg-blue-600 p-2 text-white"
				{amount}
				{currencyCode}
				currencyCodeClassName="hidden @[275px]/label:inline"
			/>
		{/if}
	</div>
</div>
