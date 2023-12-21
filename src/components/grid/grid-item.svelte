<script lang="ts">
	import clsx from 'clsx';
	export let className: string;
</script>

<li class={clsx('aspect-square transition-opacity', className)}>
	<slot />
</li>
