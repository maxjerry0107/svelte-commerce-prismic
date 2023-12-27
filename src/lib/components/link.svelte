<script lang="ts">
	import { page } from '$app/stores';
	import clsx from 'clsx';

	export let item: {
		path: string;
		title: string;
	};
</script>

<a
	href={item.path}
	class={clsx('text-neutral-500 underline-offset-4 hover:text-black hover:underline', {
		'font-bold text-black': item.path === $page.url.pathname
	})}
>
	{item.title}
</a>
