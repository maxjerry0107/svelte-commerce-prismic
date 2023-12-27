<script lang="ts">
	import { customerUpdate } from '$lib/actions';
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import { user } from '$lib/stores';
	import clsx from 'clsx';
	import { createForm } from 'svelte-forms-lib';
	import toast from 'svelte-french-toast';
	import { createSwitch } from 'svelte-headlessui';
	import { Check, Icon, XMark } from 'svelte-hero-icons';
	import * as yup from 'yup';

	$: sw = createSwitch({ label: 'Accept Marketing', checked: $user?.acceptsMarketing });

	const phoneRegExp = /(^$)|(^\+[1-9]\d{10,14}$)/;
	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			firstName: $user?.firstName,
			lastName: $user?.lastName,
			email: $user?.email,
			phone: $user?.phone
		},
		validationSchema: yup.object().shape({
			firstName: yup.string().required().label('First Name'),
			lastName: yup.string().required().label('Last Name'),
			phone: yup.string().matches(phoneRegExp, 'Valid format is +1234567890').label('Phone')
		}),
		onSubmit: async (values) => {
			const { firstName, lastName, phone } = values;
			const acceptsMarketing = $sw.checked;
			const res = await customerUpdate({ firstName, lastName, phone, acceptsMarketing });
			if (res.status == 'success') toast.success('Update success!');
			else toast.error('Update failed. Try again');
		}
	});
</script>

<form method="post" on:submit={handleSubmit} class="flex w-full max-w-lg flex-col gap-y-8">
	<div class="flex w-full flex-row gap-x-4">
		<div class="flex-1">
			<input
				type="text"
				class={clsx('border-grey-light block w-full rounded border p-3', {
					'border-red-400': $errors.firstName
				})}
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
				type="text"
				class={clsx('border-grey-light block w-full rounded border p-3', {
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
	<div class="flex flex-row gap-x-4">
		<div class="flex-1">
			<input
				type="text"
				readonly
				class="border-grey-light block w-full rounded border p-3"
				name="email"
				placeholder="Email"
				value={$user?.email}
			/>
		</div>
		<div class="flex-1">
			<input
				type="text"
				class={clsx('border-grey-light block w-full rounded border p-3', {
					'border-red-400': $errors.phone
				})}
				name="phone"
				placeholder="Phone"
				on:change={handleChange}
				on:blur={handleChange}
				bind:value={$form.phone}
			/>

			{#if $errors.phone}
				<small>{$errors.phone}</small>
			{/if}
		</div>
	</div>
	<div class="flex flex-row items-center gap-x-4">
		<label for="acceptMarketing">Accepts marketing?</label>
		<button
			class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-black transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			use:sw.toggle
		>
			<span class="sr-only">Accepts marketing?</span>
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
	<button
		type="submit"
		disabled={!$isValid}
		class="hover:bg-green-dark my-1 flex h-12 w-full items-center justify-center gap-x-2 rounded bg-black py-3 text-center text-white hover:opacity-90 focus:outline-none"
	>
		{#if $isSubmitting}
			<LoadingDots class="bg-white" />
		{:else}
			Update profile
		{/if}
	</button>
</form>
