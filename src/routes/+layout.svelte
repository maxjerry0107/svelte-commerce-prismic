<script>
	import Footer from '$lib/components/layout/footer/footer.svelte';
	import Navbar from '$lib/components/layout/navbar/navbar.svelte';
	import { user } from '$lib/stores';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	export let data;
	const { customer } = data;
	user.set(customer);
</script>

<div class="bg-neutral-50 text-black">
	<ProgressBar class="text-gray-600" />
	<div class="container">
		<Navbar />
		<div class="min-h-[500px]">
			<slot />
		</div>
		<Footer />
		<Toaster />
	</div>
</div>
