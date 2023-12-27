<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { checkout, login } from '$lib/actions';
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import clsx from 'clsx';
	import { createForm } from 'svelte-forms-lib';
	import toast from 'svelte-french-toast';
	import { MetaTags } from 'svelte-meta-tags';
	import * as yup from 'yup';

	const { form, errors, isSubmitting, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required().label('Email'),
			password: yup.string().required().label('Password')
		}),
		onSubmit: async (values) => {
			const { email, password } = values;
			const res = await login({ email, password });
			if (res.status == 'success') {
				const checkout_url = $page.url.searchParams.get('checkout_url');
				if (checkout_url) {
					const url = await checkout();
					document.location.href = url;
				} else goto('/account');
				toast.success('Sign in success!');
			} else toast.error('Sign in failed. Try again');
		}
	});
</script>

<MetaTags title="Sign in" />

<form method="post" on:submit={handleSubmit}>
	<div
		class="container mx-auto my-5 flex max-w-sm flex-1 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-2 py-5"
	>
		<div class="w-full px-6 py-8 text-black">
			<h1 class="mb-8 text-center text-3xl">Sign in</h1>
			<div class="mb-4">
				<div class="mb-4">
					<input
						type="text"
						class={clsx('border-grey-light block w-full rounded border p-3', {
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
						class={clsx('border-grey-light block w-full rounded border p-3', {
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
				<button
					type="submit"
					disabled={!$isValid}
					class="hover:bg-green-dark my-1 flex h-12 w-full items-center justify-center gap-x-2 rounded bg-black py-3 text-center text-white hover:opacity-90 focus:outline-none"
				>
					{#if $isSubmitting}
						<LoadingDots class="bg-white" />
					{:else}
						Sign in
					{/if}
				</button>
			</div>

			<div class="text-grey-dark mb-6">
				Don't have an account?
				<a class="border-blue text-blue border-b no-underline" href="/signup"> Sign up </a>.
			</div>
		</div>
	</div>
</form>
