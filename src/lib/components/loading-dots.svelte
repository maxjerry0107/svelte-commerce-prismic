<script lang="ts">
	const dots = 'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md';
	import clsx from 'clsx';
	let className: string | null = null;
	export { className as class };
</script>

<span class="mx-2 inline-flex items-center">
	<span class={clsx(dots, className)} />
	<span class={clsx(dots, 'animation-delay-[200ms]', className)} />
	<span class={clsx(dots, 'animation-delay-[400ms]', className)} />
</span>
