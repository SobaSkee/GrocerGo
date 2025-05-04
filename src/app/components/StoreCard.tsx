// app/(private)/order/components/StoreCard.tsx
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

export interface Store {
  id: number;
  name: string;
  address: string;
  hours: string;
  distance: string;
  logo: string;
}

export default function StoreCard({ store }: { store: Store }) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4">
      {/* Logo & Name */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 relative flex-shrink-0">
          <Image
            src={store.logo}
            alt={`${store.name} logo`}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <h3 className="text-lg font-semibold text-[var(--primary-text)]">{store.name}</h3>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mt-3">
        <MapPin className="w-4 h-4 flex-shrink-0 text-[var(--primary-text-light)]" />
        <p className=" text-sm text-[var(--primary-text-light)] line-clamp-2">{store.address}</p>
      </div>
    
        {/* Hours */}
      <div className="flex items-center gap-2 mt-2">
        <Clock className="w-4 h-4 flex-shrink-0 text-[var(--primary-text-light)]" />
        <p className=" text-sm text-[var(--primary-text-light)] line-clamp-2">{store.hours}</p>
      </div>

      {/* Footer: Distance + Action */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--primary)]">
          {store.distance}
        </span>
        <button className="px-4 py-1 font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--secondary-hover)] transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}
