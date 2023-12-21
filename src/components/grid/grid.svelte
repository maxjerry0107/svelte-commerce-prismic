<script lang="ts">
	import clsx from 'clsx';

	export let className: string;
</script>

<ul class={clsx('grid grid-flow-row gap-4', className)}>
	<slot />
</ul>
