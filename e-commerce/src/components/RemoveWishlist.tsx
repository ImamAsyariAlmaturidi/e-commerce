"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RemoveWishlist = ({ productId }: { productId: string }) => {
  const router = useRouter();
  async function addWishlist(productId: string) {
    try {
      await fetch("http://localhost:3000/api/wishlist", {
        cache: "no-store",
        method: "DELETE",
        headers: {
          productId,
        },
      });
      toast("Success", {
        description: `success delete from wishlist`,
        duration: 5000,
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
        Remove
      </Button>
    </div>
  );
};

export default RemoveWishlist;
