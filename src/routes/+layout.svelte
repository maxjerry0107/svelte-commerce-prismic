<script>
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import '../app.css';
	import Footer from '../components/layout/footer/footer.svelte';
	import Navbar from '../components/layout/navbar/navbar.svelte';
</script>

<div class="bg-neutral-50 text-black selection:bg-teal-300">
	<ProgressBar class="text-gray-600" />
	<div class="container">
		<Navbar />
		<slot />
		<Footer />
	</div>
</div>
