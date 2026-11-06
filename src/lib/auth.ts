import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { authClient } from "./auth-client";


// if (!process.env.MONGODB_URL) {
//     throw new Error("MONGODB_URL is not defined in .env file");
// }

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },

});

export const { signIn, signUp, signOut, useSession } = authClient;