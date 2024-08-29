// Karena ini menggunakan server actions, maka harus dideklarasikan bahwa ini hanya berjalan di server saja, maka dari itu, gunakan "use server"
"use server";

import { getUserByEmail } from "@/db/models/User";
import { compareTextWithHash } from "@/utils/bcrypt";
import { signToken } from "@/utils/jwt";
import { redirect } from "next/navigation";

// Di sini kita akan membuat schema inputan login, maka dari itu, sekalian kita validasi dengan zod
import { z } from "zod";

// Di sini kita akan menyimpan data token pada cookies, maka dari itu, kita akan menggunakan cookies dari next/headers
// !! cookies tidak bisa di-import secara otomatis, jadi harus diketik manual yah
import { cookies } from "next/headers";

// Pada action ini kita akan melakukan request ke server untuk login
// Karena kita di sini belum memiliki backend yang bisa di-call, kita akan membuat logicnya di sini (asumsikan di sini se-akan-akan kita sedang berada di server)
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

export async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/wishlist", {
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
    const data: WishListType<ProductType>[] = json.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}