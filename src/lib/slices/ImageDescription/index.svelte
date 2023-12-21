<script lang="ts">
	import clsx from 'clsx';
	import type { ImageDescriptionSlice } from '../../../prismicio-types';

	export let slice: ImageDescriptionSlice;
	const direction = slice.primary.image_left ? 'md:flex-row' : 'md:flex-row-reverse';
</script>

<section
	class="slice-section"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class={clsx('flex md:h-96 flex-col-reverse', direction)}>
		<div class="md:w-1/2 h-full flex flex-col gap-y-3 justify-center p-8">
			{#if slice.primary.title}
				<h2 class="text-2xl">{slice.primary.title}</h2>
			{/if}
			{#if slice.primary.description}
				<p class="text-sm">{slice.primary.description}</p>
			{/if}
			{#if slice.primary.cta_title}
				<a
					class="bg-black p-2 w-40 text-white text-center rounded-lg"
					href={slice.primary.cta_link || '#'}>{slice.primary.cta_title}</a
				>
			{/if}
		</div>
		<div class="md:w-1/2 h-full">
			<img
				class="w-full object-cover h-full"
				src={slice.primary.image.url}
				alt={slice.primary.image.alt || slice.primary.title}
			/>
		</div>
	</div>
</section>
