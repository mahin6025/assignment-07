import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://assignment-07-u5ex.vercel.app"
});


export const { signIn, signUp, useSession } = authClient;