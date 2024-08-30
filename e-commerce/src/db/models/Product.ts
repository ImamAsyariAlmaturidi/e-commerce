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
  try {
    const client = await getMongoClientInstance();
    const db: Db = client.db(DATABASE_NAME);
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed");
  }
};

export const getTotalProductCount = async () => {
  try {
    const db = await getDb();
    const count = await db.collection(COLLECTION_PRODUCT).countDocuments();
    return count;
  } catch (error) {
    console.error("Failed to count products:", error);
    throw new Error("Failed to count products");
  }
};

export const getProducts = async (
  skip: number,
  limit: number,
  name?: string
) => {
  try {
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
  } catch (error) {
    console.error("Failed to get products:", error);
    throw new Error("Failed to get products");
  }
};

export const getProductById = async (_id: ObjectId) => {
  try {
    const db = await getDb();
    const product = (await db.collection(COLLECTION_PRODUCT).findOne({
      _id,
    })) as ProductModel;

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Failed to get product by id:", error);
    throw new Error("Failed to get product by id");
  }
};

export const createProduct = async (product: productInputType) => {
  try {
    const db = await getDb();
    const result = await db.collection(COLLECTION_PRODUCT).insertOne(product);
    return result;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error("Failed to create product");
  }
};

export const searchProductBySlug = async (slug: string) => {
  try {
    const db = await getDb();
    const product = await db.collection(COLLECTION_PRODUCT).findOne({
      slug: slug,
    });

    return product;
  } catch (error) {
    console.error("Failed to search product by slug:", error);
    throw new Error("Failed to search product by slug");
  }
};
