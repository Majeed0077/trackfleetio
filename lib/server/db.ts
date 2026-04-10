import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var __mongooseCache__: MongooseCache | undefined;
}

const cache = globalThis.__mongooseCache__ ?? {
  conn: null,
  promise: null,
};

globalThis.__mongooseCache__ = cache;

export const connectToDatabase = async () => {
  if (!MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not configured.");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    mongoose.set("strictQuery", true);

    cache.promise = mongoose.connect(MONGO_DB_URL, {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 10000,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};
