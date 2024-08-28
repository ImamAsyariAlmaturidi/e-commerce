import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";

const DATABASE_NAME = process.env.DATABASE_NAME || "catharsis_db";
const COLLECTION_PRODUCT = "products";

type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  decription: string;
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

export const getProducts = async () => {
  const db = await getDb();

  const products = (await db
    .collection(COLLECTION_PRODUCT)
    .find()
    .toArray()) as ProductModel[];
  return products;
};

export const getProductById = async (_id: getProductByIdInputType) => {
  const db = await getDb();

  const products = (await db.collection(COLLECTION_PRODUCT).findOne({
    _id,
  })) as ProductModel;

  return products;
};

export const createProduct = async (product: productInputType) => {
  const db = await getDb();

  const create = await db.collection(COLLECTION_PRODUCT).insertOne({
    ...product,
  });

  return create;
};
