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
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
        return null;
    }
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password)
            const user = await this.account.get()
            console.log("Appwrite Service :: login :: success", { session, user })
            return user
        } catch (error) {
            throw error
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