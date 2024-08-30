"use client";
import React, { useEffect, useState } from "react";
import { BreadCrumbComponent } from "@/components/BreadCrumb";
import { PaginationComponent } from "@/components/Pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import AddWishlist from "@/components/AddWishlist";
import Search from "@/components/Search";
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

  async function getData() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/product?skip=${skip}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();

      const fetchedData = result.data || [];
      const totalProducts = result.totalProducts || 0;

      setData((prevData) => [...prevData, ...fetchedData]);
      setTotalCount(totalProducts);

      if (fetchedData.length < limit || skip + limit >= totalProducts) {
        setHasMore(false);
      } else {
        setSkip((prevSkip) => prevSkip + limit);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function refreshData() {
    setData([]);
    setSkip(0);
    setHasMore(true);
    await getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-24 justify-around">
          <BreadCrumbComponent />
          <Search />
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={getData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={refreshData}
          pullDownToRefresh
          pullDownToRefreshThreshold={30}
          pullDownToRefreshContent
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data?.map((item: dataJson) => (
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
                      <AddWishlist
                        name={item.name}
                        price={item.price}
                        productId={item._id}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default Page;
