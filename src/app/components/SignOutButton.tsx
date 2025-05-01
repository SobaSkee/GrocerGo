

import { signOut } from "@/lib/auth-client";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut(); // redirect to home after sign out
    router.push("/");
  };
  

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign Out
    </Button>
  );
}
