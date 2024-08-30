import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
type ProductType = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

type WishListType<T> = {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  products: T[];
};
export async function getDataProduct() {
  try {
    const res = await fetch(`${BASE_URL}api/product`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Cookie: cookies().toString(),
      },
    });
    if (!res.ok) {
      return redirect("/login");
    }
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
}
