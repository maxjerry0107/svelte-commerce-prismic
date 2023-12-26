<script lang="ts">
	import { browser } from '$app/environment';
	import Carousel from 'svelte-carousel';
	import type { HeroSliderSlice } from '../../../prismicio-types';
	export let slice: HeroSliderSlice;
</script>

<section
	class="slice-section"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	{#if browser}
		<Carousel let:loaded autoplayDuration={10000} pauseOnFocus arrows={false}>
			{#each slice.items as item, imageIndex (item)}
				<div class="h-[600px] relative">
					{#if loaded.includes(imageIndex)}
						<div
							class="w-full h-full object-cover bg-cover bg-center"
							style="background-image: url('{item.hero_image.url}');"
						/>
						<div class="absolute left-0 bottom-0 p-6 right-0">
							<div
								class="w-96 max-w-full flex flex-col p-4 gap-y-5 backdrop-blur bg-white/20 rounded-md"
							>
								{#if item.hero_title}
									<h2 class="text-2xl">{item.hero_title}</h2>
								{/if}
								{#if item.hero_description}
									<p class="text-sm">{item.hero_description}</p>
								{/if}
								{#if item.hero_cta_title}
									<a
										class="bg-black p-2 w-40 text-white text-center rounded-lg"
										href={item.hero_cta_link || '#'}>{item.hero_cta_title}</a
									>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</Carousel>
	{/if}
</section>
