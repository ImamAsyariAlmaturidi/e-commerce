import { NavbarComponent } from "@/components/Navbar";
import RemoveWishlist from "@/components/RemoveWishlist";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
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

const Page = async () => {
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

  let visible: boolean;

  const store = cookies();
  const token = store.get("token");
  if (!token) {
    visible = false;
  } else {
    visible = true;
  }

  return (
    <div>
      <NavbarComponent visible={visible} />

      <div className="bg-gray-100 dark:bg-gray-900 pt-32 lg:pt-20 min-h-screen">
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
              Your Wishlist
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {data?.flatMap((item) => item.products).length} items
            </p>
          </div>
          <div className="mt-10 lg:mt-12 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
            {data?.length > 0 && (
              <>
                {data
                  .flatMap((item) => item.products)
                  .map((product) => (
                    <div
                      key={product._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                      <Link href={`/product/${product.slug}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-48 object-cover object-center"
                        />
                        <div className="p-4">
                          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            {product.name}
                          </h2>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {product.description}
                          </p>
                          <p className="my-4 text-base font-semibold text-gray-800 dark:text-white">
                            Rp.{product.price}
                          </p>
                        </div>
                        <div className="flex justify-around mb-6">
                          <Button className="w-52 py-2">CHECKOUT</Button>
                          <RemoveWishlist productId={product._id} />
                        </div>
                      </Link>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
