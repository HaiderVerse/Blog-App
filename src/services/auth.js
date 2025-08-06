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
            const userAccount = await this.account.create(ID.unique(), name, email, password)
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
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
        return null;
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw new Error("Appwrite Service :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            throw
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