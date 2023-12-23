<script lang="ts">
	import clsx from 'clsx';
	import Label from '../label.svelte';
	export let isInteractive: boolean = true;
	export let active: boolean = false;
	export let className: string = '';
	export let alt: string = '';
	export let label: {
		title: string;
		amount?: string;
		currencyCode?: string;
		position?: 'bottom' | 'center';
	} | null = null;
	export let src: string;
</script>

<div
	class={clsx(
		'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600',
		{
			relative: label,
			'border-2 border-blue-600': active,
			'border-neutral-200': !active
		}
	)}
>
	{#if src}
		<img
			{alt}
			class={clsx(
				'relative h-full w-full object-cover',
				{
					'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
				},
				className
			)}
			{src}
		/>
	{/if}
	{#if label}
		<Label
			title={label.title}
			amount={label.amount}
			currencyCode={label.currencyCode}
			position={label.position || 'bottom'}
		/>
	{/if}
</div>
