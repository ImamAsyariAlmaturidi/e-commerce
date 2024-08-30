import { NavbarComponent } from "@/components/Navbar";
import RemoveWishlist from "@/components/RemoveWishlist";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { getData } from "./action";

const Page = async () => {
  let visible: boolean;

  const store = cookies();
  const token = store.get("token");
  if (!token) {
    visible = false;
  } else {
    visible = true;
  }
  const data = await getData();

  if (!data) {
    return <NavbarComponent visible={visible} />;
  }

  return (
    <div>
      <NavbarComponent visible={visible} />
      <div className="bg-gray-100 dark:bg-gray-900 pt-32 lg:pt-20 min-h-screen">
        <div className="mx-auto container px-4 md:px-6 lg:px-8 xl:px-12 py-12 flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
              Your Wishlist
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {data?.flatMap((item) => item.products).length} items
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {data?.length > 0 && (
              <>
                {data
                  .flatMap((item) => item.products)
                  .map((product) => (
                    <div
                      key={product._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                      <Link href={`/product/${product.slug}`} className="block">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full  h-64 object-cover"
                        />
                      </Link>
                      <div className="p-4 flex flex-col flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {product.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex-grow">
                          {product.description}
                        </p>
                        <p className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                          Rp.{product.price}
                        </p>
                        <div className="flex justify-between items-center">
                          <Button className="flex-shrink-0 py-2 px-4">
                            CHECKOUT
                          </Button>
                          <RemoveWishlist productId={product._id} />
                        </div>
                      </div>
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
