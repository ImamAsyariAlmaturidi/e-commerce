"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { deleteWishlist } from "@/app/wishlist/action";

const RemoveWishlist = ({ productId }: { productId: string }) => {
  return (
    <div>
      <Button
        className="text-sm"
        variant="outline"
        onClick={() => deleteWishlist(productId)}
      >
        Remove
      </Button>
    </div>
  );
};

export default RemoveWishlist;
