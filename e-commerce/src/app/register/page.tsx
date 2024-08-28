import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <center>
          <h1 className="font-mono text-3xl tracking-wide font-bold ">
            Buat Sebuah Akun
          </h1>
        </center>
        <div className="flex flex-col gap-5 my-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              className="w-96 text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
              type="text"
              placeholder="First Name"
            />
            <Input
              className="w-96 text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <Input
            className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
            type="text"
            placeholder="Username"
          />
          <Input
            className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
            type="email"
            placeholder="Email"
          />
          <Input
            className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
            type="text"
            inputMode="numeric"
            placeholder="Phone Number"
          />
          <Input
            className="w-full text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
            type="password"
            placeholder="Password"
          />
          <Button className="p-6">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
