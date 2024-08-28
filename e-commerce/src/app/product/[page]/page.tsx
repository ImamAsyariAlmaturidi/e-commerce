"use client";

import React from "react";
import { useRouter } from "next/router";
import { ItemType } from "../../types/dataTypes";
import { BreadCrumbComponent } from "@/components/BreadCrumb";
import { PaginationComponent } from "@/components/Pagination";
import Search from "@/components/Search";

const Page = async () => {
  const router = useRouter();
  const { query } = router;
  const currentPage = parseInt(query.page as string) || 1; // Default ke halaman 1 jika tidak ada

  // Ambil data produk dari API
  const res = await fetch("http://localhost:3000/api/product");
  const { data } = await res.json();

  // Tentukan jumlah item per halaman
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Potong data sesuai halaman
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-24 flex justify-between">
          <BreadCrumbComponent />
          <Search />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {paginatedData.map((item: ItemType) => (
            <div
              key={item._id}
              className="group bg-white border rounded-md overflow-hidden shadow-sm"
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
                <p className="mt-2 text-sm font-medium text-gray-900">
                  ${item.price}
                </p>
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
