<script lang="ts">
	import clsx from 'clsx';
	export let amount: string;
	let className: string | null = null;
	export { className as class };
	export let currencyCode: string = 'USD';
	export let currencyCodeClassName: string | null = null;
</script>

<p class={className}>
	{`${new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: currencyCode,
		currencyDisplay: 'narrowSymbol'
	}).format(parseFloat(amount))}`}
	<span class={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
</p>
