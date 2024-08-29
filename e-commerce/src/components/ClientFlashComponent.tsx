"use client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessageRef = useRef<string | null>(null);

  useEffect(() => {
    const newErrorMessage = searchParams.get("error");

    if (newErrorMessage && newErrorMessage !== errorMessageRef.current) {
      errorMessageRef.current = newErrorMessage;

      toast.error(newErrorMessage, {
        duration: 5000,
      });
    }
  }, [searchParams]);

  return null;
};

export default ClientFlashComponent;
