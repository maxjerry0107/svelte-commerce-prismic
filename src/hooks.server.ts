import { getCustomer } from "$lib/shopify"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies } = event
  const accessToken = cookies.get('accessToken')
  // before endpoint or page is called
  if (accessToken) {
    const customer = await getCustomer({ accessToken });
    if (customer) {
      event.locals.customer = customer;
    }
  }

  if (!event.locals.customer) cookies.delete('accessToken', { path: '/' })

  const response = await resolve(event)

  // after endpoint or page is called

  return response
}