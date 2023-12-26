<script lang="ts">
	import { signup } from '$lib/actions';
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import clsx from 'clsx';
	import { createForm } from 'svelte-forms-lib';
	import toast from 'svelte-french-toast';
	import { MetaTags } from 'svelte-meta-tags';
	import * as yup from 'yup';

	const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = createForm({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: yup.object().shape({
			firstName: yup.string().required().label('First Name'),
			lastName: yup.string().required().label('Last Name'),
			email: yup.string().email().required().label('Email'),
			password: yup.string().required().label('Password').min(5),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'Password must match')
				.label('Confirm Password')
		}),
		onSubmit: async (values) => {
			const { firstName, lastName, email, password } = values;
			const res = await signup({ firstName, lastName, email, password });
			if (res.status == 'success') toast.success('Sign up success!');
			else toast.error('Sign up failed. Try again');
		}
	});
</script>

<MetaTags title="Sign up" />

<form method="post" on:submit={handleSubmit}>
	<div
		class="my-5 py-5 rounded-lg border border-neutral-200 bg-white container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
	>
		<div class="px-6 py-8 text-black w-full">
			<h1 class="mb-8 text-3xl text-center">Sign up</h1>
			<div class="mb-4">
				<input
					type="text"
					class={clsx('block border border-grey-light w-full p-3 rounded', {
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
			<div class="mb-4">
				<input
					type="text"
					class={clsx('block border border-grey-light w-full p-3 rounded', {
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
			<div class="mb-4">
				<input
					type="text"
					class={clsx('block border border-grey-light w-full p-3 rounded', {
						'border-red-400': $errors.email
					})}
					name="email"
					placeholder="Email"
					on:change={handleChange}
					on:blur={handleChange}
					bind:value={$form.email}
				/>

				{#if $errors.email}
					<small>{$errors.email}</small>
				{/if}
			</div>
			<div class="mb-4">
				<input
					type="password"
					class={clsx('block border border-grey-light w-full p-3 rounded', {
						'border-red-400': $errors.password
					})}
					name="password"
					placeholder="Password"
					on:change={handleChange}
					on:blur={handleChange}
					bind:value={$form.password}
				/>
				{#if $errors.password}
					<small>{$errors.password}</small>
				{/if}
			</div>
			<div class="mb-4">
				<input
					type="password"
					class={clsx('block border border-grey-light w-full p-3 rounded', {
						'border-red-400': $errors.confirmPassword
					})}
					name="confirmPassword"
					placeholder="Confirm Password"
					on:change={handleChange}
					on:blur={handleChange}
					bind:value={$form.confirmPassword}
				/>
				{#if $errors.confirmPassword}
					<small>{$errors.confirmPassword}</small>
				{/if}
			</div>
			<button
				type="submit"
				disabled={!$isValid}
				class="h-12 flex items-center justify-center gap-x-2 hover:opacity-90 w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
			>
				{#if $isSubmitting}
					<LoadingDots className="bg-white" />
				{:else}
					Create Account
				{/if}
			</button>
		</div>

		<div class="text-grey-dark mb-6">
			Already have an account?
			<a class="no-underline border-b border-blue text-blue" href="/signin"> Sign in </a>.
		</div>
	</div>
</form>
