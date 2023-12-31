<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { customerAddressUpdate, customerDefaultAddressUpdate } from '$lib/actions';
	import AutocompleteInput from '$lib/components/autocomplete-input.svelte';
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import type { MailingAddress } from '$lib/shopify';
	import { user } from '$lib/stores';
	import clsx from 'clsx';
	import countryData from 'country-region-data/data.json';
	import { createForm } from 'svelte-forms-lib';
	import toast from 'svelte-french-toast';
	import { createSwitch } from 'svelte-headlessui';
	import { Check, Icon, XMark } from 'svelte-hero-icons';
	import * as yup from 'yup';

	export let selectedAddress: MailingAddress | null = null;

	const countries = countryData.map((item) => {
		return item.countryName;
	});

	$: provinces = countryData
		.find((item) => {
			return item.countryName === $form.country;
		})
		?.regions.map((item) => {
			return item.name;
		});

	$: sw = createSwitch({
		label: 'Default address',
		checked: false
	});
	const phoneRegExp = /(^$)|(^\+[1-9]\d{10,14}$)/;

	$: if (selectedAddress) {
		form.set({
			firstName: selectedAddress?.firstName || $user?.firstName,
			lastName: selectedAddress?.lastName || $user?.lastName,
			company: selectedAddress?.company || '',
			address1: selectedAddress?.address1 || '',
			address2: selectedAddress?.address2 || '',
			city: selectedAddress?.city || '',
			country: selectedAddress?.country || '',
			province: selectedAddress?.province || '',
			zip: selectedAddress?.zip || '',
			phone: selectedAddress?.phone || ''
		});
		sw.set({ checked: selectedAddress?.id === $page.data.addressData?.defaultId });
	}
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			firstName: $user?.firstName,
			lastName: $user?.lastName,
			company: '',
			address1: '',
			address2: '',
			city: '',
			country: '',
			province: '',
			zip: '',
			phone: ''
		},
		validationSchema: yup.object().shape({
			firstName: yup.string().required().label('First Name'),
			lastName: yup.string().required().label('Last Name'),
			company: yup.string().label('Company'),
			address1: yup.string().required().label('Address1'),
			address2: yup.string().label('Address2'),
			city: yup.string().required().label('City'),
			country: yup.string().required().label('Country'),
			province: yup.string().label('Province'),
			zip: yup.string().required().label('ZipCode'),
			phone: yup.string().matches(phoneRegExp, 'Valid format is +1234567890').label('Phone')
		}),
		onSubmit: async (values) => {
			const { customerAddress, customerUserErrors } = await customerAddressUpdate({
				address: { ...values },
				addressId: selectedAddress?.id || ''
			});
			if (customerAddress) {
				if ($sw.checked && $page.data.addressData?.defaultId != selectedAddress?.id) {
					const res = await customerDefaultAddressUpdate({ addressId: customerAddress.id });
					if (res.status == 'success') toast.success('Address save success!');
					else toast.success('Address saved but set default failed');
				} else toast.success('Address save success!');
				selectedAddress = null;
				invalidate('customer:addresses');
			} else {
				toast.error(customerUserErrors?.[0].message || 'Address save failed');
			}
		}
	});
</script>

<form method="post" on:submit={handleSubmit} class="flex w-full max-w-lg flex-col gap-y-4">
	<div class="flex w-full flex-row gap-x-4">
		<div class="flex-1">
			<input
				type="text"
				class={clsx('block w-full rounded border p-3', {
					'border-red-400': $errors.firstName
				})}
				autocomplete="given-name"
				name="firstName"
				placeholder="First Name"
				on:change={handleChange}
				on:blur={handleChange}
				bind:value={$form.firstName}
			/>
			{#if $errors.firstName}
				<small>{$errors.firstName}</small>
			{/if}
		</div>
		<div class="flex-1">
			<input
				autocomplete="family-name"
				type="text"
				class={clsx('block w-full rounded border p-3', {
					'border-red-400': $errors.lastName
				})}
				name="lastName"
				placeholder="Last Name"
				on:change={handleChange}
				on:blur={handleChange}
				bind:value={$form.lastName}
			/>
			{#if $errors.lastName}
				<small>{$errors.lastName}</small>
			{/if}
		</div>
	</div>
	<div>
		<input
			type="text"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.company
			})}
			autocomplete="organization"
			name="company"
			placeholder="Company"
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.company}
		/>
		{#if $errors.company}
			<small>{$errors.company}</small>
		{/if}
	</div>
	<div>
		<input
			type="text"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.address1
			})}
			name="address1"
			autocomplete="address-line1"
			placeholder="Address1"
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.address1}
		/>
		{#if $errors.address1}
			<small>{$errors.address1}</small>
		{/if}
	</div>
	<div>
		<input
			type="text"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.address2
			})}
			name="address2"
			autocomplete="address-line2"
			placeholder="Address2"
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.address2}
		/>
		{#if $errors.address2}
			<small>{$errors.address2}</small>
		{/if}
	</div>
	<div>
		<input
			type="text"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.city
			})}
			name="city"
			autocomplete="address-level2"
			placeholder="City"
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.city}
		/>
		{#if $errors.city}
			<small>{$errors.city}</small>
		{/if}
	</div>
	<div>
		<AutocompleteInput
			name="country"
			placeholder="Country"
			items={countries}
			autocomplete="country"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.country
			})}
			defaultValue={$form.country}
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.country}
		/>
		{#if $errors.country}
			<small>{$errors.country}</small>
		{/if}
	</div>
	<div>
		<AutocompleteInput
			name="province"
			autocomplete="address-level1"
			placeholder="Province"
			items={provinces}
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.province
			})}
			defaultValue={$form.province}
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.province}
		/>
		{#if $errors.province}
			<small>{$errors.province}</small>
		{/if}
	</div>

	<div>
		<input
			type="text"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.zip
			})}
			name="zip"
			autocomplete="postal-code"
			placeholder="Postal/ZIP code"
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.zip}
		/>
		{#if $errors.zip}
			<small>{$errors.zip}</small>
		{/if}
	</div>
	<div>
		<input
			type="text"
			class={clsx('block w-full rounded border p-3', {
				'border-red-400': $errors.phone
			})}
			name="phone"
			autocomplete="tel"
			placeholder="Phone"
			on:change={handleChange}
			on:blur={handleChange}
			bind:value={$form.phone}
		/>
		{#if $errors.phone}
			<small>{$errors.phone}</small>
		{/if}
	</div>
	<div class="flex flex-row items-center gap-x-4">
		<label for="acceptMarketing">Default address?</label>
		<button
			class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-black transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			use:sw.toggle
		>
			<span class="sr-only">Default address?</span>
			<span
				aria-hidden="true"
				class="{$sw.checked
					? 'translate-x-9'
					: 'translate-x-0'} pointer-events-none flex h-[34px] w-[34px] transform items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
			>
				{#if $sw.checked}
					<Icon src={Check} size="20" />
				{:else}
					<Icon src={XMark} size="20" />
				{/if}
			</span>
		</button>
		<input type="checkbox" value={$sw.checked} class="hidden" name="acceptMarketing" />
	</div>
	<div class="flex flex-row gap-x-4">
		<button
			type="submit"
			disabled={!$isValid}
			class="hover:bg-green-dark my-1 flex h-12 w-full items-center justify-center gap-x-2 rounded bg-black py-3 text-center text-white hover:opacity-90 focus:outline-none"
		>
			{#if $isSubmitting}
				<LoadingDots class="bg-white" />
			{:else}
				Save Address
			{/if}
		</button>
		<button
			on:click={() => {
				selectedAddress = null;
			}}
			class="hover:bg-green-dark my-1 flex h-12 w-full items-center justify-center gap-x-2 rounded bg-black py-3 text-center text-white hover:opacity-90 focus:outline-none"
			>Cancel</button
		>
	</div>
</form>
