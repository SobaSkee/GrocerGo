'use client';

import { useParams } from 'next/navigation';

export default function StorefrontPage() {
  const params = useParams();
  const storeName = (params.store as string).charAt(0).toUpperCase() + (params.store as string).slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{storeName} Storefront</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>Eggs</div>
        <div>Milk</div>
        <div>Bread</div>
        <div>Butter</div>
        <div>Cheese</div>
        <div>Yogurt</div>
      </div>
    </div>
  );
}
