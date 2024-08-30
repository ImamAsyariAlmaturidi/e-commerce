"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NavbarComponent } from "@/components/Navbar";

// Tipe data untuk form state
interface FormData {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  error: string;
}

type messageType = {
  fields: string;
  message: string;
};

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const message: ApiResponse = await res.json();

      if (message.message === "Validation failed") {
        const parsedErrors = JSON.parse(message.error);
        toast(parsedErrors[0].field + " " + parsedErrors[0].message, {
          description: "and please make sure not empty fields",
        });
      } else if (message.statusCode === 400) {
        toast(message.message, {
          description: "error",
        });
      } else {
        toast("Success registration account", {
          description: "Yey",
        });
        return router.push("/login");
      }
    } catch (error) {
      toast("An unexpected error occurred", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <div>
      <NavbarComponent visible={false} />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Buat Sebuah Akun
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={register} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
                type="text"
                placeholder="First Name"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
              <Input
                name="lastName"
                className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
                type="text"
                placeholder="Last Name"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <Input
              name="username"
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="text"
              placeholder="Username"
              value={formData.username || ""}
              onChange={handleChange}
            />
            <Input
              name="email"
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="text"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <Input
              name="phoneNumber"
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="text"
              inputMode="numeric"
              placeholder="Phone Number"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
            />
            <Input
              name="password"
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="password"
              placeholder="Password"
              value={formData.password || ""}
              onChange={handleChange}
            />
            <Button type="submit" className="p-4 mt-4">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
