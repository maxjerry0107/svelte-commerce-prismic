<script lang="ts">
	import AccountAddressEdit from '$lib/components/account/address/account-address-edit.svelte';
	import AccountAddressItem from '$lib/components/account/address/account-address-item.svelte';
	import type { MailingAddress } from '$lib/shopify';
	export let data;
	let selectedAddress: MailingAddress | null = null;
</script>

{#if selectedAddress || data.addressData?.addresses?.length == 0}
	<AccountAddressEdit bind:selectedAddress />
{:else if data.addressData?.addresses}
	<div class="grid w-full grid-cols-2 gap-4 px-6">
		{#each data.addressData?.addresses as item}
			<AccountAddressItem
				{item}
				bind:selectedAddress
				defaultAddressId={data.addressData.defaultId}
			/>
		{/each}
	</div>
{/if}
