import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string | undefined): Promise<User | null> => {
    if (!email) return null; // Return null if email is undefined or falsy

    try {
        const user = await db.user.findUnique({
            where: { email }
        });
        return user;
    } catch {
        return null;
    }
}

export const getUserById = async (id: string | undefined): Promise<User | null> => {
    if (!id) return null; // Return null if id is undefined or falsy

    try {
        const user = await db.user.findUnique({
            where: { id }
        });
        return user;
    } catch {
        return null;
    }
}
