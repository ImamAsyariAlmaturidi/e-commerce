"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { deleteWishlist } from "@/app/wishlist/action";
import { toast } from "sonner";
const RemoveWishlist = ({ productId }: { productId: string }) => {
  async function del() {
    try {
      await deleteWishlist(productId);
      toast(`Success delete from wishlist`, {
        duration: 3000,
      });
    } catch (error) {
      console.log;
    }
  }
  return (
    <div>
      <Button className="text-sm" variant="outline" onClick={() => del()}>
        Remove
      </Button>
    </div>
  );
};

export default RemoveWishlist;
