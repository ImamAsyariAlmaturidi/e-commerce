import { NextRequest, NextResponse } from "next/server";
import { searchProductBySlug } from "@/db/models/Product";

export async function GET(request: NextRequest) {
  const slug = request.headers.get("slug");

  if (!slug) {
    return NextResponse.json(
      { message: "Slug tidak disediakan", data: null },
      { status: 400 }
    );
  }

  try {
    const product = await searchProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Sukses", data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
