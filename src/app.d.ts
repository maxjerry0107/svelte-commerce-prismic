
// See https://kit.svelte.dev/docs/types#app

import type { Customer } from "$lib/shopify/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			customer: Customer | undefined
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };

