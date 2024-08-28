"use client";
import { ItemType } from "@/app/types/dataTypes";
import React from "react";
import { toast } from "sonner";

const MainCard = ({ data }: { data: ItemType[] }) => {
  const limitedData = data.slice(0, 6);

  return (
    <>
      {limitedData.map((item) => (
        <div key={item._id} className="mb-4 p-4 border rounded-lg shadow-sm">
          <img
            width={500}
            className="rounded-xl cursor-pointer"
            src="https://cdn.bndla.com/12674/i/c69ae9f786b00edbee72c7cf069fd82c.jpg?Look-1858"
            alt={item.name}
          />
          <h1 className="text-center truncate mt-3 font-mono text-lg">
            {item.name}
          </h1>
          <h2 className="text-center truncate mt-1 font-mono text-sm text-gray-600">
            {item.description}
          </h2>
        </div>
      ))}
    </>
  );
};

export default MainCard;
