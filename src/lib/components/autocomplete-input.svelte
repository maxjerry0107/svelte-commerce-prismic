<script lang="ts">
	import { onMount } from 'svelte';

	import clsx from 'clsx';
	let className: string = '';
	export { className as class };
	export let items: string[] = [];
	export let value;
	export let name: string | null = null;
	export let placeholder: string = '';

	let filteredItems: string[] = [];
	let searchInputRef: HTMLInputElement;
	let autocompleteRef: HTMLDivElement;
	let inputValue = '';

	onMount(() => {
		autocompleteRef.addEventListener('keydown', navigateList);
		return () => autocompleteRef.removeEventListener('keydown', navigateList);
	});

	const filterItems = () => {
		let storageArr: string[] = [];
		if (inputValue) {
			items.forEach((item) => {
				if (item.toLowerCase().includes(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(item)];
				}
			});
		}
		filteredItems = storageArr;
	};

	$: if (!inputValue) {
		filteredItems = [];
		hiLiteIndex = -1;
	}

	const setInputVal = (item: string) => {
		inputValue = removeBold(item);
		filteredItems = [];
		hiLiteIndex = -1;
		searchInputRef.focus();
	};

	const makeMatchBold = (str: string) => {
		const regEx = new RegExp(inputValue, 'gi');
		let boldedMatch = str.replace(regEx, '<strong>$&</strong>');
		return boldedMatch;
	};

	const removeBold = (str: string) => {
		return str.replace(/<(.)*?>/g, '');
	};

	let hiLiteIndex: number = -1;

	$: value = filteredItems[hiLiteIndex] || inputValue;

	const navigateList = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown' && hiLiteIndex <= filteredItems.length - 1) {
			hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? (hiLiteIndex = filteredItems.length - 1) : (hiLiteIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(filteredItems[hiLiteIndex]);
		} else {
			return;
		}
	};
</script>

<div bind:this={autocompleteRef}>
	<input
		{name}
		{...$$restProps}
		class={className}
		type="text"
		on:change
		on:blur
		{placeholder}
		bind:this={searchInputRef}
		bind:value={inputValue}
		on:input={filterItems}
	/>
	<div class="relative">
		{#if filteredItems.length > 0}
			<ul class="absolute m-0 max-h-48 w-full overflow-y-auto border p-0">
				{#each filteredItems as item, i}
					<li
						class={clsx(
							'left-0 right-0 top-[100%] z-50 cursor-pointer list-none border-b py-1 hover:bg-black hover:text-white',
							i === hiLiteIndex ? 'bg-black text-white' : 'bg-white text-black'
						)}
					>
						<button class="h-full w-full p-2 text-left" on:click={() => setInputVal(item)}>
							{@html item}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
