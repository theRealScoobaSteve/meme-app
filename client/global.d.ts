declare global {
    interface BaseEntity {
        createdAt: string;
        updatedAt: string;
    }

    interface User extends BaseEntity {
        id: number;
        email: string;
        password?: string;
    }

    interface Meme extends BaseEntity {
        id: number;
        fileName: string;
        mimeType: string;
        name: string;
        path: string;
        user: User;
    }
}