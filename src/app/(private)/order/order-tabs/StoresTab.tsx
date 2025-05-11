import { Store } from "@/app/components/StoreCard";
import StoreCard from "@/app/components/StoreCard";

const stores: Store[] = [
  {
    id: 1,
    name: "Publix at Westgate Shopping Center",
    address: "3315 W University Ave, Gainesville, FL 32607",
    hours: "7:00 AM - 10:00 PM",
    distance: "2.5 miles", // example distance in the future calculate based on user location from ip
    logo: "/images/store-logos/publix-logo.webp",
  },
  {
    id: 2,
    name: "Walmart at Butler Plaza",
    address: "3315 W University Ave, Gainesville, FL 32607",
    hours: "7:00 AM - 10:00 PM",
    distance: "3 miles", 
    logo: "/images/store-logos/publix-logo.webp",
  },
  {
    id: 3,
    name: "Publix at Westgate Shopping Center",
    address: "3315 W University Ave, Gainesville, FL 32607",
    hours: "7:00 AM - 10:00 PM",
    distance: "2.5 miles", 
    logo: "/images/store-logos/publix-logo.webp",
  },
  {
    id: 4,
    name: "Publix at Westgate Shopping Center",
    address: "3315 W University Ave, Gainesville, FL 32607",
    hours: "7:00 AM - 10:00 PM",
    distance: "2.5 miles", 
    logo: "/images/store-logos/publix-logo.webp",
  },
];

export default function StoresTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  )
}
