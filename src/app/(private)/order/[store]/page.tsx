import { redirect } from 'next/navigation';

interface StorePageProps {
  params: {
    store: string;
  };
}

export default function StorePage({ params }: StorePageProps) {
  redirect(`/order/${params.store}/storefront`);
} 