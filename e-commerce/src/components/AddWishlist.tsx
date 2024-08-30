"use client";
import React from "react";
import { Button } from "./ui/button";
import { addWishlist } from "@/app/wishlist/action";
import { useRouter } from "next/navigation";
const AddWishlist = ({
  name,
  price,
  productId,
}: {
  name: string;
  price: number;
  productId: string;
}) => {
  const router = useRouter();
  async function addToWishlist(productId: string) {
    try {
      await addWishlist(productId);
      router.push("/wishlist");
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <Button
        className="text-sm"
        variant="outline"
        onClick={() => addToWishlist(productId)}
      >
        Add to wishlist
      </Button>
    </div>
  );
};

export default AddWishlist;
