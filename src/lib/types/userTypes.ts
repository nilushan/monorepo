// src/lib/types/userTypes.ts

/**
 * Represents a user within our application domain.
 * This type is independent of any specific authentication library.
 */
export interface AppUser {
  id: string;
  name?: string | null; // Optional based on your user model
  email: string;
  // Add other application-specific user properties here
  // e.g., role: string;
  // Avoid including sensitive data like password hashes here.
}

/**
 * Represents a user document as stored in MongoDB, including credentials.
 * This type should only be used on the backend and never exposed to the client.
 */
import { ObjectId } from "mongodb";

export interface DbUser {
  _id: ObjectId;
  email: string;
  name?: string | null;
  passwordHash: string;
  // Optionally, include a salt if using manual password hashing
  salt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}