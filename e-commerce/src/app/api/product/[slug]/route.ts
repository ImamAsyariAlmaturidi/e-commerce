import { NextRequest, NextResponse } from "next/server";
import { searchProductBySlug } from "@/db/models/Product";
export async function GET(request: NextRequest) {
  const slug = request.headers.get("slug");
  try {
    if (!slug) {
      return null;
    }
    const product = await searchProductBySlug(slug);

    return NextResponse.json({
      message: "success",
      data: product,
    });
  } catch (error) {
    return NextResponse.json({
      message: "failed",
      data: [],
    });
  }
}
