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
		class="my-5 py-5 rounded-lg border border-neutral-200 bg-white container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
	>
		<div class="px-6 py-8 text-black w-full">
			<h1 class="mb-8 text-3xl text-center">Sign in</h1>
			<div class="mb-4">
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
				<button
					type="submit"
					disabled={!$isValid}
					class="h-12 flex items-center justify-center gap-x-2 hover:opacity-90 w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
				>
					{#if $isSubmitting}
						<LoadingDots className="bg-white" />
					{:else}
						Sign in
					{/if}
				</button>
			</div>

			<div class="text-grey-dark mb-6">
				Don't have an account?
				<a class="no-underline border-b border-blue text-blue" href="/signup"> Sign up </a>.
			</div>
		</div>
	</div>
</form>
