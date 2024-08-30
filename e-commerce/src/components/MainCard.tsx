"use client";
import { ItemType } from "@/app/types/dataTypes";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";
const MainCard = ({
  data,
  numberSlice,
  initialNumberSlice,
}: {
  data: ItemType[];
  numberSlice: number;
  initialNumberSlice: number;
}) => {
  const limitedData = data.slice(initialNumberSlice, numberSlice);

  return (
    <>
      {limitedData.map((item) => (
        <Link key={item._id} href={`/product/${item.slug}`}>
          <div key={item._id} className="mb-4 p-4  rounded-lg shadow-lg">
            <div className="flex justify-center">
              <img width={300} src={item.thumbnail} alt={item.name} />
            </div>
            <h1 className="text-center truncate mt-3 font-mono text-lg">
              {item.name}
            </h1>
            <h2 className="text-center truncate mt-1 font-mono text-sm text-gray-600">
              {item.description}
            </h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default MainCard;
