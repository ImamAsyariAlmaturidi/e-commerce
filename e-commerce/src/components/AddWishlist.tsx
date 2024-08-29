"use client";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const AddWishlist = ({ name, price }: { name: string; price: number }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        className="text-sm"
        variant="outline"
        onClick={() =>
          toast("Success", {
            description: `${name} with price ${price} success wishlist`,
            duration: 10000,
            action: {
              label: "Check",
              onClick: () => router.push("/wishlist"),
            },
          })
        }
      >
        Add to wishlist
      </Button>
    </div>
  );
};

export default AddWishlist;
