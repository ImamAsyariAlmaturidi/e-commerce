"use client";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
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
  async function addWishlist(productId: string) {
    try {
      await fetch("http://localhost:3000/api/wishlist", {
        cache: "no-store",
        method: "POST",
        headers: {
          productId,
        },
      });
      toast("Success", {
        description: `${name} with price ${price} success wishlist`,
        duration: 600,
      });
      return router.push("/wishlist");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        className="text-sm"
        variant="outline"
        onClick={() => addWishlist(productId)}
      >
        Add to wishlist
      </Button>
    </div>
  );
};

export default AddWishlist;
