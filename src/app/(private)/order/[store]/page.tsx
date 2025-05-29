import { redirect } from 'next/navigation';

export default async function StorePage({ params }: { params: { store: string } }) {
  redirect(`/order/${params.store}/storefront`);
}
