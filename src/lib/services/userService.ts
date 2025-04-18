import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import clientPromise from "../clients/mongoClient";
import type { DbUser } from "../types/userTypes";
import type { AppUser } from "@/lib/types/userTypes";


const DB_NAME = process.env.MONGODB_DB || "local";
const USERS_COLLECTION = "users";

/**
 * Verifies user credentials against the database.
 * This function encapsulates the logic for finding a user and checking their password.
 * It should remain framework-agnostic (doesn't know about NextAuth directly).
 *
 * @param email The user's email
 * @param password The user's plain text password
 * @returns The user object (without sensitive data like password hash) if valid, otherwise null.
 */
export const verifyUserCredentials = async (
  email: string,
  password?: string | null,
): Promise<AppUser | null> => {
  if (!email || !password) {
    console.log('[UserService] Missing email or password for verification.');
    return null;
  }

  // Use the MongoDB-backed user service
  const user = await validateUserCredentials(email, password);
  if (!user) {
    console.log(`[UserService] Invalid credentials for: ${email}`);
    return null;
  }

  // Map to AppUser (exclude passwordHash)
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
};

export async function validateUserCredentials(email: string, password: string): Promise<Omit<DbUser, "passwordHash"> | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}


export async function createUser(email: string, password: string, name?: string | null): Promise<Omit<DbUser, "passwordHash">> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const users = db.collection<DbUser>(USERS_COLLECTION);

  // Check if user already exists
  const existing = await users.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  const user: DbUser = {
    _id: new ObjectId(),
    email,
    name: name || null,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };

  await users.insertOne(user);

  // Never return passwordHash
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const users = db.collection<DbUser>(USERS_COLLECTION);
  return users.findOne({ email });
}

