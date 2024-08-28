import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI;

// Memastikan bahwa connectionString sudah ada value-nya
if (!connectionString) {
  throw new Error("MONGODB_URI is not defined");
}

// Tipe data dari client adalah MongoClient
let client: MongoClient;

// Fungsi ini akan mengembalikan client yang sudah terkoneksi dengan MongoDB
// Hanya boleh ada 1 instance client (Singleton)
export const getMongoClientInstance = async () => {
  if (!client) {
    client = await MongoClient.connect(connectionString);
    await client.connect();
  }

  return client;
};
