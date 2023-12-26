<script lang="ts">
	import { components } from '$lib/slices';
	import { SliceZone } from '@prismicio/svelte';

	export let slices: any | undefined = undefined;

	$: topSlices = slices;
	$: bottomSlices = [];
	$: index = slices?.findIndex((slice: any) => slice.slice_type === 'non_prismic_content');
	$: if (index != -1) {
		topSlices = slices?.slice(0, index);
		bottomSlices = index && slices?.slice(index + 1);
	}
</script>

{#if topSlices}
	<SliceZone slices={topSlices} {components} />
{/if}
<div class="mb-6">
	<slot />
</div>
{#if bottomSlices}
	<SliceZone slices={bottomSlices} {components} />
{/if}
