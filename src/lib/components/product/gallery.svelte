<script lang="ts">
	import { ArrowLeft, ArrowRight, Icon } from 'svelte-hero-icons';
	import GridTile from '../grid/grid-tile.svelte';

	export let images: { src: string; altText: string }[];
	let imageIndex = 0;
	$: if (images) imageIndex = 0;
	const buttonClassName =
		'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

	const goPrev = () => {
		imageIndex = imageIndex == 0 ? 0 : imageIndex - 1;
	};
	const goNext = () => {
		imageIndex = imageIndex == images.length - 1 ? images.length - 1 : imageIndex + 1;
	};
</script>

<div class="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
	{#if images[imageIndex]}
		<img
			class="h-full w-full object-contain"
			sizes="(min-width: 1024px) 66vw, 100vw"
			alt={images[imageIndex]?.altText}
			src={images[imageIndex]?.src}
		/>
	{/if}

	{#if images.length > 1}
		<div class="absolute bottom-[15%] flex w-full justify-center">
			<div
				class="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80"
			>
				<button aria-label="Previous product image" on:click={goPrev} class={buttonClassName}>
					<Icon src={ArrowLeft} class="w-5 h-5" />
				</button>
				<div class="mx-1 h-6 w-px bg-neutral-500"></div>
				<button aria-label="Next product image" on:click={goNext} class={buttonClassName}>
					<Icon src={ArrowRight} class="w-5 h-5" />
				</button>
			</div>
		</div>
	{/if}
</div>

{#if images.length > 1}
	<ul
		class="my-12 flex items-center justify-center gap-2 overflow-x-auto overflow-y-hidden py-1 lg:mb-0"
	>
		{#each images as image, index (image)}
			<!-- content here -->
			<li class="h-20 w-20">
				<button
					aria-label="Enlarge product image"
					on:click={() => {
						imageIndex = index;
					}}
					class="h-full w-full"
				>
					<GridTile
						alt={image.altText}
						src={image.src}
						className="w-20 h-20"
						active={index === imageIndex}
					/>
				</button>
			</li>
		{/each}
	</ul>
{/if}
