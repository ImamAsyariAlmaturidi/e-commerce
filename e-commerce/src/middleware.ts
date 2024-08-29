import { NextRequest, NextResponse } from "next/server";

// ?? Di sini kita akan menggunakan cookies
import { cookies } from "next/headers";
// ?? Ini sudah tidak digunakan lagi
// import {readPayload } from "./lib/jwt"
// ?? Jangan lupa import readPayloadJose
import { readPayloadJose } from "@/utils/jwt";

// Ingat: middleware hanya bisa ada satu
// ?? Sekarang karena kita akan menggunakan jose yang promise based, ini akan menjadi async
export const middleware = async (request: NextRequest) => {
  // ?? Karena di sini kita akan menggunakan "logic middleware lebih dari satu", maka di sini kita akan menggunakan banyak perkondisian (menggunakan if / if-else)

  // ?? Karena ini fungsi yang akan dijalankan di semuanya, maka kita akan comment yah
  // // Di sini harapannya kita hanya ingin menuliskan HTTP method apa yang sedang digunakan dan url apa yang sedang dituju
  // console.log(request.method, request.url);

  // // Seperti pada Express, karena ini middleware, kita harus meng-"sliding" supaya request bisa dilanjutkan ke handler berikutnya dengan menggunakan "next()"
  // return NextResponse.next();

  // ?? Di sini kita akan menambahkan kondisi untuk meng-exclude semua url yang mengandung kata "api", "_next/static", "_next/image", dan "favicon.ico"
  // if (
  //   !request.url.includes("/api") &&
  //   !request.url.includes("_next/static") &&
  //   !request.url.includes("_next/image") &&
  //   !request.url.includes("favicon.ico")
  // ) {
  //   console.log(request.method, request.url);
  // }

  // ?? Di sini kita akan melakukan "authentication" pada route `/api`
  // ?? Hal ini secara efektif akan membuat semua route `/api` menjadi "private", termasuk di dalamnya adalah untuk melakukan "register" (POST /users)
  if (request.url.includes("/api/wishlist")) {
    console.log("API", request.method, request.url);

    // Di sini kita akan mengambil token yang ada di dalam cookies
    const cookiesStore = cookies();
    // console.log(cookiesStore, "<<< cookiestore");
    const token = cookiesStore.get("token");
    // Di sini kita akan mengecek apakah token ada atau tidak, apabila tidak ada, maka kita akan mengembalikan response dengan status code 401 (Unauthorized)
    if (!token) {
      // Karena asumsi ini adalah DARI /api (route handler), maka kita akan menggunakan NextResponse.json()
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    // Umumnya setelah ini kita akan melakukan pengecekan apakah token yang ada di dalam cookies itu valid atau tidak, namun karena cookies ini awalnya diberikan dari server, maka kita akan langsung menganggap bahwa token yang ada di dalam cookies itu valid
    // (Walaupun ini umumnya tergantung konsiderasi dari developer, apakah ingin melakukan validasi lagi atau langsung percaya saja dengan token yang ada di dalam cookies)

    // Setelah itu kita akan membaca token yang ada di dalam cookies dan mengambil data user yang ada di dalamnya.
    // Ingat asumsinya tokenData itu berisi Object { id: string, email: string }
    // const tokenData = readPayload(token.value) as { id: string; email: string };
    const tokenData = await readPayloadJose<{ id: string; email: string }>(
      token.value
    );

    // Setelah itu umumnya kita akan melakukan penambahan data ke dalam request yang kita miliki (request.user = tokenData), namun karena di sini kita tidak bisa memiliki data tambahan di dalam request, maka kita akan menggunakan antara cookies ATAU headers

    // Pada pembelajaran ini, maka kita akan menggunakan headers
    const requestHeaders = new Headers(request.headers);

    // Di sini kita akan menambahkan data user ke dalam headers
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);
    requestHeaders.set("x-custom-value", "Ini untuk mencoba data tambahan");

    // Di sini kita akan mengembalikan response dengan headers yang sudah kita tambahkan
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  // Jangan lupa untuk meng-"sliding" supaya request bisa dilanjutkan ke handler berikutnya dengan menggunakan "next()"
  return NextResponse.next();
};

// ?? Karena di sini kita akan menggunakan middleware yang logic dan pathnya berbeda-beda, maka kita tidak akan menggunakan config.matcher
// // References:
// // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   // Kita akan menggunakan regex untuk melakukan filtering
//   // Pada filtering ini akan meng-exclude semua url yang mengandung kata "api", "_next/static", "_next/image", dan "favicon.ico" (perhatikan tanda "!" pada regex)
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],

//   // !! Warning: pada matcher ini sekalipun regex, wajib bersifat constant (tidak boleh ada variabel di dalamnya. apabila ada variabel, maka akan di-ignore !)
// };
