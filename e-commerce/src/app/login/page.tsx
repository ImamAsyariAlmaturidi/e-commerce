import React, { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { doLogin } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { NavbarComponent } from "@/components/Navbar";
import { cookies } from "next/headers";
const Page = () => {
  let visible: boolean;

  const store = cookies();
  const token = store.get("token");
  if (!token) {
    visible = false;
  } else {
    visible = true;
  }
  return (
    <div>
      <NavbarComponent visible={visible} />
      <header className="h-72 text-black bg-slate-200 flex justify-center items-end font-extrabold text-3xl tracking-wide">
        Selamat Datang di Catharsis Empire
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 px-8 lg:px-24 bg-slate-200 h-screen -mt-44">
        <section className="flex justify-center items-center w-full">
          <ClientFlashComponent />
          <form action={doLogin} className="flex flex-col gap-3">
            <h1 className="text-sm font-mono font-light">
              Masuk dengan alamat email dan kata sandi anda
            </h1>
            <Input
              className="w-full max-w-md text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
              type="email"
              placeholder="Email"
              name="email"
            />
            <Input
              className="w-full max-w-md text-sm font-mono font-extralight bg-neutral-200 shadow-sm shadow-black"
              type="password"
              placeholder="Password"
              name="password"
            />
            <Button type="submit" className="p-4  text-white">
              MASUK
            </Button>
          </form>
        </section>
        <section className="flex justify-center items-center w-full">
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-lg">
              Keuntungan dari akun Anda Menjadi bagian dari CATHARSIS EMPIRE
            </h2>
            <p className="text-sm font-mono font-extralight">
              Kumpulkan KOIN dan tukarkan dengan diskon nanti. Akses ke
              kompetisi untuk konser dan acara. Pra-akses ke berbagai tindakan.
              Pesan dengan cepat dan mudah. Gambaran umum dan pengelolaan data
              Anda. Daftar keinginan produk yang disimpan. Detail tentang
              riwayat pesanan, status, dan informasi pelacakan.
            </p>
            <Link href="/register">
              <Button className="p-4 w-full bg-gray-500 text-white hover:bg-gray-800">
                BUAT SEBUAH AKUN
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
