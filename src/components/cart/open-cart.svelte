<script lang="ts">
	import { Icon, ShoppingCart } from 'svelte-hero-icons';
	export let quantity: number | null = null;
</script>

<div
	class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
>
	<Icon src={ShoppingCart} class="h-4 transition-all ease-in-out hover:scale-110" />
	{#if quantity}
		<div
			class="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white"
		>
			{quantity}
		</div>
	{/if}
</div>
