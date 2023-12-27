import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const { customer } = locals
  if (!customer) {
    redirect(302, '/signin');
  }
}