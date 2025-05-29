import { redirect } from 'next/navigation';

export default async function StorePage({ params }: { params: { store: string } }) {
  const params_identifier = await params;
  redirect(`/order/${params_identifier.store}/storefront`);
}