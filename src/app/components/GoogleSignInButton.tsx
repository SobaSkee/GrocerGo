import { FC, ReactNode } from 'react';
import { Button } from '@/app/components/ui/button';
import { authClient } from "@/lib/auth-client"; //import the auth client
 

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/order',
        // errorCallbackURL: '/sign-in',
        // newUserCallbackURL: '/order',
        // disableRedirect: false
      })
    }
    catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;