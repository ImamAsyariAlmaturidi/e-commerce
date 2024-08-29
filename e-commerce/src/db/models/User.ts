import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { hashText } from "../../utils/bcrypt";

export type UserModel = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.DATABASE_NAME || "catharsis_db";
const COLLECTION_USER = "users";

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
export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email: email })) as UserModel;

  return user;
};

export const getUserByUsername = async (username: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ username: username })) as UserModel;

  return user;
};
