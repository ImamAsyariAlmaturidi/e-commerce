"use client";
import React, { useEffect } from "react";
import { ItemType } from "../types/dataTypes";
import { BreadCrumbComponent } from "@/components/BreadCrumb";
import { PaginationComponent } from "@/components/Pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AddWishlist from "@/components/AddWishlist";
import { useState } from "react";
import Search from "@/components/Search";

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
  async function getData() {
    try {
      const res = await fetch("http://localhost:3000/api/product", {
        method: "GET",
      });
      const { data } = await res.json();
      const limitedData: dataJson[] = data?.slice(0, 6);
      setData(limitedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-white">
      {/* <InfiniteScroll
        dataLength={limitedData.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={limitedData.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {limitedData}
      </InfiniteScroll> */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <div className=" mt-24 justify-around">
          <BreadCrumbComponent />
          <Search />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((item: dataJson) => (
            <div
              key={item._id}
              className="group  bg-white border rounded-md overflow-hidden shadow-sm"
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
                  <a href="#">{item.name}</a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
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
            </div>
          ))}
        </div>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default Page;
