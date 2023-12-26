<script lang="ts">
	import { page } from '$app/stores';
	import type { Menu } from '$lib/shopify/types';
	import clsx from 'clsx';
	export let item: Menu;
	$: active = $page.url.pathname === item.path;
</script>

<li>
	<a
		href={item.path}
		class={clsx(
			'block p-2 text-lg underline-offset-4 hover:text-black hover:underline  md:inline-block md:text-sm',
			{
				'text-black ': active
			}
		)}
	>
		{item.title}
	</a>
</li>
