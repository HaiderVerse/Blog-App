import { Client, Databases, ID, Query } from "appwrite";
import conf from "@/conf/conf";

class ArticlesServices {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteDatabaseId);
        this.database = new Databases(this.client)

    }

    async createArticle(slug, { title, featured_image, content, status }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featured_image,
                    content,
                    status
                }
            )
        } catch (error) {
            throw new Error("Appwrite Service :: createArticle :: error", error);
        }
    }

    async updateArticle(slug, { title, featured_image, content, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featured_image,
                    content,
                    status
                }
            )
        } catch (error) {
            throw new Error("Appwrite Service :: updateArticle :: error", error);
        }
    }

    async getArticle(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                [
                    Query.equal('status', 'published')
                ]
            )
        } catch (error) {
            throw new Error("Appwrite Service :: getArticle :: error", error);
        }
    }

    async listArticles() {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status', 'published')
                ]
            )
        } catch (error) {
            throw new Error("Appwrite Service :: listArticles :: error", error);
        }
    }
}

const articlesServices = new ArticlesServices();

export default articlesServices