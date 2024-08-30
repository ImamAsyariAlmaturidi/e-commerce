import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";

const DATABASE_NAME = process.env.DATABASE_NAME || "catharsis_db";
const COLLECTION_PRODUCT = "products";

type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
};

type productInputType = Omit<ProductModel, "_id">;
type getProductByIdInputType = Pick<ProductModel, "_id">;

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getTotalProductCount = async () => {
  const db = await getDb();

  const count = await db.collection(COLLECTION_PRODUCT).countDocuments();
  return count;
};

export const getProducts = async (
  skip: number,
  limit: number,
  name?: string
) => {
  const db = await getDb();

  const query: any = {};

  if (name) {
    query.$or = [
      {
        name: {
          $regex: name,
          $options: "i",
        },
      },
      {
        slug: {
          $regex: name,
          $options: "i",
        },
      },
    ];
  }

  const products = await db
    .collection(COLLECTION_PRODUCT)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();

  return products;
};

export const getProductById = async (_id: getProductByIdInputType) => {
  const db = await getDb();

  const product = (await db.collection(COLLECTION_PRODUCT).findOne({
    _id,
  })) as ProductModel;

  return product;
};

export const createProduct = async (product: productInputType) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_PRODUCT).insertOne({
    ...product,
  });

  return result;
};

export const searchProductBySlug = async (slug: string) => {
  const db = await getDb();
  const product = await db.collection(COLLECTION_PRODUCT).findOne({
    slug: slug,
  });

  return product;
};
