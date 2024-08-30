import AddWishlist from "@/components/AddWishlist";
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
type ProductType = {
  _id: string;
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
};

type SlugType = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: SlugType;
}): Promise<Metadata> {
  const response = await fetch(
    `http://localhost:3000/api/product/${params.slug}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        slug: params.slug,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ProductType } = await response.json();

  return {
    title: data.name,
    description: data.description,
    icons: {
      icon: "/logo.ico",
    },
  };
}

export const Page = async ({ params }: { params: SlugType }) => {
  const response = await fetch(
    `http://localhost:3000/api/product/${params.slug}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        slug: params.slug,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ProductType } = await response.json();

  return (
    <div className="font-sans pt-36 bg-gray-100">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg bg-white p-6 rounded-lg">
          <div className="lg:col-span-3 w-full text-center">
            <div className="px-4 py-10 rounded-lg shadow-lg bg-gray-50">
              <img
                src={data.thumbnail}
                alt={data.name}
                className="w-3/4 rounded object-cover mx-auto"
              />
              <button
                type="button"
                className="top-4 right-4 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="hover:fill-white"
                  viewBox="0 0 64 64"
                >
                  <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {data.images.map((image, index) => (
                <div
                  key={index}
                  className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-lg bg-gray-50 cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {data.name}
            </h2>
            <div className="flex space-x-2 mt-4">
              {Array.from({ length: 4 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 ${
                    index < 3 ? "fill-gray-600" : "fill-gray-300"
                  }`}
                  viewBox="0 0 14 13"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <h4 className="text-gray-800 text-base my-4">500 Reviews</h4>
            </div>
            <p className="text-gray-800 text-xs font-bold">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">${data.price}</p>
              <p className="text-gray-400 text-base">
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold rounded"
              >
                Buy now
              </button>
              <AddWishlist
                productId={data._id}
                name={data.name}
                price={data.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
