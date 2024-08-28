import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { hashText } from "../../utils/bcrypt";

// Mendefinisikan type dari UserModel
export type UserModel = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

// Mendefinisikan type dari UserModelCreateInput yang tidak menggunakan _id
export type UserModelCreateInput = Omit<UserModel, "_id">;

// constant value
const DATABASE_NAME = process.env.DATABASE_NAME || "catharsis_db";
const COLLECTION_USER = "users";

// model crud
export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUser = async () => {
  const db = await getDb();

  const user = (await db
    .collection(COLLECTION_USER)
    .find()
    .project({ password: 0, createdAt: 0, updatedAt: 0 })
    .toArray()) as UserModel[];
  return user;
};

export const createUser = async (user: UserModelCreateInput) => {
  const modifiedUser: UserModelCreateInput = {
    ...user,
    password: hashText(user.password),
  };
  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return result;
};
