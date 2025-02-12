import mongoose from 'mongoose';

// Define the type for our cached mongoose instance
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Declare the global type to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

// Type for mongoose connection options
type MongooseConnectionOptions = {
  bufferCommands: boolean;
};

// Type assertion for environment variable
const MONGODB_URI = process.env.MONGODB_URI as string;

// Validate environment variable at runtime
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Initialize the cached connection
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: MongooseConnectionOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectDB;