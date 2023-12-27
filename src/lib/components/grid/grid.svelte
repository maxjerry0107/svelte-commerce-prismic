<script lang="ts">
	import clsx from 'clsx';

	let className: string;
	export { className as class };
</script>

<ul class={clsx('grid grid-flow-row gap-4', className)}>
	<slot />
</ul>
