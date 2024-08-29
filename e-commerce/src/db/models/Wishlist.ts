import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { z } from "zod";
import { $ } from "bun";
const DATABASE_NAME = process.env.DATABASE_NAME || "catharsis_db";
const COLLECTION_WISHLIST = "wishlists";

export const getDb = async (): Promise<Db> => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
};

type WishlistInputType = Omit<Wishlist, "_id">;
export const getWishlistByUserId = async (
  userId: string
): Promise<Wishlist[]> => {
  const agg = [
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "products",
      },
    },
  ];
  const db = await getDb();

  const wishlist = (await db
    .collection(COLLECTION_WISHLIST)
    .aggregate(agg)
    .toArray()) as Wishlist[];

  return wishlist;
};

export const createUserWishlist = async (input: WishlistInputType) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_WISHLIST).insertOne(input);
  return result;
};

export const deleteUserWishlistById = async (input: WishlistInputType) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_WISHLIST).deleteOne(input);
  return result;
};
