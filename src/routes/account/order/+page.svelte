<script lang="ts">
	import type { Order } from '$lib/shopify/types.js';
	import dayjs from 'dayjs';
	export let data;
	const { orders } = data;
	let selectedOrder: Order | null = null;
	const onClickOrder = (order: Order) => {
		selectedOrder = order;
	};
</script>

{#if orders.length == 0}
	<p>No orders yet</p>
{:else if selectedOrder}
	<div class="flex w-full flex-row">
		<div class="flex w-2/3 flex-col gap-y-2">
			<p class="font-bold">Order {selectedOrder?.orderNumber}</p>
			<div class="flex flex-col gap-y-2">
				{#if selectedOrder?.lineItems}
					{#each selectedOrder?.lineItems as item}
						<div class="flex flex-row items-center gap-x-4">
							<img
								src={item.variant?.image?.transformedSrc}
								alt={item.variant?.image?.altText || item.title}
							/>
							<div class="flex flex-1 flex-col gap-1">
								<p>
									{item.title}
								</p>
								{#if item.variant?.title !== 'Default Title'}
									<small class="font-bold">{item.variant?.title}</small>
								{/if}
							</div>
							<small class="font-bold">
								{item.variant?.price.currencyCode}
								{item.variant?.price.amount}
								*{item.quantity}
								= {item.originalTotalPrice.currencyCode}
								{item.originalTotalPrice.amount}
							</small>
						</div>
					{/each}
				{/if}
			</div>
			<div class="flex flex-row items-end">
				<div class="flex-1"></div>
				<div>
					<p>
						Total: <span class="font-bold">
							{selectedOrder.totalPrice.currencyCode}
							{selectedOrder.totalPrice.amount}
						</span>
					</p>
				</div>
			</div>
		</div>
		<div class="flex w-1/3 flex-col gap-y-4 px-6 text-sm">
			{#if selectedOrder?.billingAddress}
				<div class="rounded-md border px-4 py-2">
					<p class="font-bold">Billing Address</p>
					{#if selectedOrder?.billingAddress?.name}
						<p>{selectedOrder?.billingAddress?.name}</p>
					{/if}
					{#if selectedOrder?.billingAddress?.company}
						<p>{selectedOrder?.billingAddress?.company}</p>
					{/if}
					{#if selectedOrder?.billingAddress?.address1}
						<p>{selectedOrder?.billingAddress?.address1}</p>
					{/if}
					{#if selectedOrder?.billingAddress?.address2}
						<p>{selectedOrder?.billingAddress?.address2}</p>
					{/if}
					{#if selectedOrder?.billingAddress?.formattedArea}
						<p>{selectedOrder?.billingAddress?.formattedArea}</p>
					{/if}
					{#if selectedOrder?.billingAddress?.zip}
						<p>{selectedOrder?.billingAddress?.zip}</p>
					{/if}
					{#if selectedOrder?.billingAddress?.phone}
						<p>{selectedOrder?.billingAddress?.phone}</p>
					{/if}
				</div>
			{/if}
			{#if selectedOrder?.shippingAddress}
				<div class="rounded-md border px-4 py-2">
					<p class="font-bold">Shipping Address</p>
					{#if selectedOrder?.shippingAddress?.name}
						<p>{selectedOrder?.shippingAddress?.name}</p>
					{/if}
					{#if selectedOrder?.shippingAddress?.company}
						<p>{selectedOrder?.shippingAddress?.company}</p>
					{/if}
					{#if selectedOrder?.shippingAddress?.address1}
						<p>{selectedOrder?.shippingAddress?.address1}</p>
					{/if}
					{#if selectedOrder?.shippingAddress?.address2}
						<p>{selectedOrder?.shippingAddress?.address2}</p>
					{/if}
					{#if selectedOrder?.shippingAddress?.formattedArea}
						<p>{selectedOrder?.shippingAddress?.formattedArea}</p>
					{/if}
					{#if selectedOrder?.shippingAddress?.zip}
						<p>{selectedOrder?.shippingAddress?.zip}</p>
					{/if}
					{#if selectedOrder?.shippingAddress?.phone}
						<p>{selectedOrder?.shippingAddress?.phone}</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
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
				<tr
					class="cursor-pointer"
					on:click={() => {
						onClickOrder(item);
					}}
				>
					<td class="text-center">{item.orderNumber}</td>
					<td class="text-center">{dayjs(item.processedAt).format('DD/MM/YYYY')}</td>
					<td class="text-center">{item.financialStatus}</td>
					<td class="text-center">{item.fulfillmentStatus}</td>
					<td class="text-center">{item.totalPrice.currencyCode}{item.totalPrice.amount}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
