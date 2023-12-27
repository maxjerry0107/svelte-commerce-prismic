<script lang="ts">
	import clsx from 'clsx';
	let className: string;
	export { className as class };
</script>

<li class={clsx('aspect-square transition-opacity', className)}>
	<slot />
</li>
