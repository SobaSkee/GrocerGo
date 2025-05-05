import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://grocer-go-sooty.vercel.app" // The base URL of your auth server
})
export const { useSession, signIn, signOut, signUp, getSession } = authClient;