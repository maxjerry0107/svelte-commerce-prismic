<script lang="ts">
	import dayjs from 'dayjs';
	export let data;
	const { orders } = data;
</script>

{#if orders.length == 0}
	<p>No orders yet</p>
{:else}
	<table class="w-full">
		<thead>
			<tr>
				<th id="ColumnOrder" scope="col" role="columnheader">Order</th>
				<th id="ColumnDate" scope="col" role="columnheader">Date</th>
				<th id="ColumnPayment" scope="col" role="columnheader">Payment status</th>
				<th id="ColumnFulfillment" scope="col" role="columnheader"> Fulfillment status </th>
				<th id="ColumnTotal" scope="col" role="columnheader">Total</th>
			</tr>
		</thead>
		<tbody>
			{#each orders as item}
				<tr>
					<td>{item.orderNumber}</td>
					<td>{dayjs(item.processedAt).format('DD/MM/YYYY')}</td>
					<td>{item.financialStatus}</td>
					<td>{item.fulfillmentStatus}</td>
					<td>{item.totalPrice.amount}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
