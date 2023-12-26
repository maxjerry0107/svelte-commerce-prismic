<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroImageWithTextSlice;
</script>

<section
	class="slice-section h-56 relative"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<img
		class="w-full object-cover h-full"
		src={slice.primary.image.url}
		alt={slice.primary.image.alt || slice.primary.heading}
	/>
	<div class="absolute inset-0 flex items-center justify-center">
		<div
			class="w-full h-full flex flex-col items-center justify-center p-6 gap-y-5 backdrop-blur-sm bg-white/20 rounded-md"
		>
			{#if slice.primary.heading}
				<h2 class="text-3xl">{slice.primary.heading}</h2>
			{/if}
			{#if slice.primary.cta_title}
				<a
					class="bg-black p-2 w-40 text-white text-center rounded-lg"
					href={slice.primary.cta_link || '#'}>{slice.primary.cta_title}</a
				>
			{/if}
		</div>
	</div>
</section>
