import { Client, Account, ID } from "appwrite";
import conf from '@/conf/conf'

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)

    }
    async createAccount({ name, email, password }) {
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         console.log({ name, email, password });
        //         resolve({ name, email, password }); // Return via resolve
        //     }, 3000);
        // });
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) return this.login({ email, password });

        } catch (error) {
            throw error;
        }
    }
    // async login({ email, password }) {
    //     try {
    //         const session = await this.account.createEmailPasswordSession(email, password)
    //         const user = await this.account.get()
    //         console.log("Appwrite Service :: login :: success", { session, user })
    //         return user
    //     } catch (error) {
    //         throw error
    //     }
    // }
    async login({ email, password }) {
        try {
            // First, get the user
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await this.account.get();

            // Check if admin
            if (user.labels && user.labels.includes("admin")) {
                // Delete the normal session because we will use magic link
                await this.account.deleteSession("current");

                // Send magic link email
                await this.account.createMagicURLToken(ID.unique(), email, 'http://localhost:5173/verify-email');
                console.log("Magic link sent to admin email.");
                return {
                    type: "admin",
                    message: "Verification link sent to your email.",
                };
            }

            // Normal user flow
            console.log("Appwrite Service :: login :: success", { session, user });
            return {
                type: "user",
                userData: user,
                session
            };

        } catch (error) {
            throw error;
        }
    }
    async completeMagicLogin({ secret, userId }) {
        try {
            const session = await this.account.createSession(userId, secret);
            const user = await this.account.get();
            return { session, user };
        } catch (error) {
            console.error("Appwrite Service :: completeMagicLogin :: error", error);
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error("Appwrite Service :: getCurrentUser :: error", error);
        }
    }
    async logout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            throw error
        }
        return null;
    }
    async logoutFormAll() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;