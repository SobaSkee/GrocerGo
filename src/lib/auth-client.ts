import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://grocer-go-sooty.vercel.app" // The base URL of your auth server
    //baseURL: "http://localhost:3000"
})
export const { useSession, signIn, signOut, signUp, getSession } = authClient;