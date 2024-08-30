"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NavbarComponent } from "@/components/Navbar";

const Page = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          password,
        }),
      });

      const message = await res.json();

      if (message.statusCode === 400) {
        toast(
          `email or username already using, please choice another email or username `,
          {
            description: "error",
          }
        );
      } else {
        toast("success registration account", {
          description: "Yey",
        });
        return router.push("/login");
      }
    } catch (error: unknown) {
      console.log(error);
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
                className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <Input
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="text"
              inputMode="numeric"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Input
              className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
