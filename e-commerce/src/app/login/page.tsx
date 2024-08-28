import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <center className="h-72 text-black  bg-slate-200 justify-center items-end flex font-extrabold text-3xl tracking-wide">
        Selamat Datang di Catharsis Empire
      </center>
      <div className="grid grid-cols-2 px-24 bg-slate-200  -mt-44">
        <div className="flex justify-center items-center w-full">
          <div className=" flex flex-col gap-3">
            <div>
              <h1 className="text-sm font-mono font-light">
                Masuk dengan alamat email dan kata sandi anda
              </h1>
            </div>
            <Input
              className="w-96 text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
              type="email"
              placeholder="Email"
            />
            <Input
              className="w-96 text-sm font-mono font-extralight  bg-neutral-200 shadow-sm shadow-black"
              type="password"
              placeholder="Password"
            />
            <Button className="p-8">MASUK</Button>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen w-full">
          <div className=" flex flex-col gap-3">
            <h1 className="font-extrabold">
              Keuntungan dari akun Anda Menjadi bagian dari CATHARSIS EMPIRE
            </h1>
            <h1 className="text-sm font-mono font-extralight">
              Kumpulkan KOIN dan tukarkan dengan diskon nanti Akses ke kompetisi
              untuk konser dan acara Pra-akses ke berbagai tindakan Pesan dengan
              cepat dan mudah Gambaran umum dan pengelolaan data Anda Daftar
              keinginan produk yang disimpan Detail tentang riwayat pesanan,
              status dan informasi pelacakan
            </h1>
            <Link href="/register" className="justify-center">
              <Button className="p-8 w-full">BUAT SEBUAH AKUN</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
