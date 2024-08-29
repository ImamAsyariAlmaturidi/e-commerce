"use server";
import { NextRequest, NextResponse } from "next/server";
import { getWishlistByUserId, createUserWishlist } from "@/db/models/Wishlist";
import { z } from "zod";
const userInputSchema = z.object({
  userId: z.string(),
});

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export async function GET(request: NextRequest) {
  const data = request.headers.get("x-user-id");

  try {
    const parsedData = userInputSchema.safeParse({ userId: data });
    if (!parsedData.success) {
      throw parsedData.error;
    }
    const wishlist = await getWishlistByUserId(parsedData.data.userId);

    if (!wishlist || wishlist.length === 0) {
      return NextResponse.json<MyResponse<never>>({
        statusCode: 404,
        message: "No wishlist found",
      });
    }

    return NextResponse.json<MyResponse<typeof wishlist>>({
      statusCode: 200,
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const parsedData = userInputSchema.safeParse(data);
//     if (!parsedData.success) {
//       throw parsedData.error;
//     }
//     const result = await createUserWishlist(data);
//     return NextResponse.json<MyResponse<typeof result>>({
//       statusCode: 201,
//       data: result,
//     });
//   } catch (error) {
//     return NextResponse.json<MyResponse<never>>({
//       statusCode: 400,
//       message: "Bad Request",
//       error: (error as Error).message,
//     });
//   }
// }