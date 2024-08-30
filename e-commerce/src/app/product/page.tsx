"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgresComponent } from "@/components/Progres";
import { getDataProduct } from "./action";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  const [limit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [textInput, setTextInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProducts = async () => {
    try {
      // const res = await fetch(`${BASE_URL}/api/product`, {
      //   cache: "no-store",
      //   method: "GET",
      //   headers: {
      //     name: searchQuery || "",
      //     skip: String(skip),
      //     limit: String(limit),
      //   },
      // });
      // const data = await res.json();
      const data = await getDataProduct(searchQuery, skip, limit);
      const fetchedData: dataJson[] = data.data || [];
      const totalProducts = data.totalProducts || 0;
      if (fetchedData.length < limit || skip + limit >= totalProducts) {
        setHasMore(false);
      }
      setData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item._id));
        const newData = fetchedData.filter(
          (item) => !existingIds.has(item._id)
        );
        return [...prevData, ...newData];
      });
      setTotalCount(totalProducts);
      setSkip((prevSkip) => prevSkip + limit);
      console.log;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    setSearchQuery(textInput);
    setData([]);
    setSkip(0);
    setHasMore(true);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-20 justify-around">
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
                className="absolute right-0 top-0 h-full px-4 text-white bg-gray-500 hover:bg-gray-600 rounded-r-lg"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={data.length}
          next={fetchProducts} // Fetch more data when scrolled to bottom
          hasMore={hasMore} // Indicate if there are more items to fetch
          loader={
            <center>
              <ProgresComponent />
            </center>
          }
          endMessage={
            <p className="text-center text-gray-500">No more products</p>
          }
          // Ensure fetchProducts is not called when `hasMore` is false
          style={{ overflow: "hidden" }}
        >
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
                      src={item.thumbnail}
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
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Page;
