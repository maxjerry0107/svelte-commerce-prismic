<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { customerAddressDelete } from '$lib/actions';
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import type { MailingAddress } from '$lib/shopify';
	import { createForm } from 'svelte-forms-lib';
	import toast from 'svelte-french-toast';
	import { Check, Icon } from 'svelte-hero-icons';

	export let item: MailingAddress;
	export let defaultAddressId: string | undefined;
	export let selectedAddress: MailingAddress | null = null;
	const btnClass =
		'hover:bg-green-dark my-1 flex h-9 w-full items-center justify-center gap-x-2 rounded bg-black py-3 text-center text-white hover:opacity-90 focus:outline-none';

	$: isDefault = item.id === defaultAddressId;

	const { isSubmitting, handleSubmit } = createForm({
		initialValues: {},
		onSubmit: async () => {
			const { deletedCustomerAddressId, customerUserErrors } = await customerAddressDelete({
				addressId: item.id
			});
			if (deletedCustomerAddressId) {
				toast.success('Address deleted');
				invalidate('customer:addresses');
			} else toast.error(customerUserErrors?.[0].message || 'Address delete failed');
		}
	});
</script>

<div class="relative flex flex-col gap-y-2 rounded-2xl border p-6">
	{#if isDefault}
		<Icon src={Check} size="30" class="absolute right-6 top-6" />
	{/if}
	{#if item.name}
		<p>{item.name}</p>
	{/if}
	{#if item.company}
		<p>{item.company}</p>
	{/if}
	{#if item.address1}
		<p>{item.address1}</p>
	{/if}
	{#if item.address2}
		<p>{item.address2}</p>
	{/if}
	{#if item.formattedArea}
		<p>{item.formattedArea}</p>
	{/if}
	{#if item.zip}
		<p>{item.zip}</p>
	{/if}
	{#if item.phone}
		<p>{item.phone}</p>
	{/if}
	<form class="flex flex-row gap-x-2" on:submit={handleSubmit}>
		<button
			class={btnClass}
			on:click={() => {
				selectedAddress = item;
			}}>Edit</button
		>
		<button type="submit" class={btnClass}
			>{#if $isSubmitting}
				<LoadingDots class="bg-white" />
			{:else}
				Delete
			{/if}</button
		>
	</form>
</div>
