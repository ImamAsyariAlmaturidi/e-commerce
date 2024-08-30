"use client";
import React, { useEffect, useState } from "react";
import { BreadCrumbComponent } from "@/components/BreadCrumb";
import { PaginationComponent } from "@/components/Pagination";
import Link from "next/link";
import { motion } from "framer-motion";

type dataJson = {
  createdAt: string;
  description: string;
  excerpt: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  tags: string[];
  thumbnail: string;
  updatedAt: string;
  _id: string;
};

const Page = () => {
  const [data, setData] = useState<dataJson[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [textInput, setTextInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function getData(name?: string) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/product?skip=${skip}&limit=${limit}${
          name ? `&name=${name}` : ""
        }`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();

      const fetchedData = result.data || [];
      const totalProducts = result.totalProducts || 0;

      // Jika data yang didapatkan lebih sedikit dari limit atau mencapai total produk
      // berarti tidak ada data lebih lanjut yang bisa diambil
      if (fetchedData.length < limit || skip + limit >= totalProducts) {
        setHasMore(false);
      }

      // Set data berdasarkan hasil fetch
      setData((prevData) => [...prevData, ...fetchedData]);
      setTotalCount(totalProducts);

      // Update skip untuk request berikutnya
      setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function refreshData() {
    setData([]);
    setSkip(0);
    setHasMore(true);
    await getData(searchQuery);
  }

  const handleSearch = () => {
    setSearchQuery(textInput);
    refreshData();
  };

  const handleLoadMore = () => {
    if (hasMore) {
      getData(searchQuery);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSkip(0);
      setData([]);
      getData(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-24 justify-around">
          <BreadCrumbComponent />
          <div className="max-w-md mx-auto">
            <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-neutral-900 overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-center text-white bg-neutral-900 pr-12"
                type="text"
                placeholder="Search something..."
                onChange={(e) => setTextInput(e.target.value)}
                value={textInput}
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 h-full px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((item: dataJson) => (
            <Link key={item._id} href={`/product/${item.slug}`}>
              <motion.div
                className="group bg-white border rounded-md overflow-hidden relative shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none">
                  <img
                    src={
                      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="mt- text-sm font-medium text-gray-900">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
        <PaginationComponent />
      </div>
    </div>
  );
};

export default Page;
