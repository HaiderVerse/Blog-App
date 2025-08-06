import { Client, Storage, ID } from "appwrite";
import conf from "@conf/conf";

class FileServices {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw new Error("Appwrite Service :: uploadFile :: error", error);
        }
        return null
    }

    async deleteFile(id) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                id
            )
        } catch (error) {
            throw new Error("Appwrite Service :: deleteFile :: error", error);
        }
        return null
    }

    getFilePreview(id) {
        return this.bucket.getFile(
            conf.appwriteBucketId,
            id
        )
    }
}

const fileServices = new FileServices();

export default fileServices;