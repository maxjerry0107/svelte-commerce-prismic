import { writable, type Writable } from 'svelte/store';
import type { Cart, Customer } from './shopify/types';

export const cart: Writable<Cart | undefined> = writable();
export const user: Writable<Customer | undefined> = writable()
