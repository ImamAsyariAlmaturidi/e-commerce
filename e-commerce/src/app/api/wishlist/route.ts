"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  getWishlistByUserId,
  createUserWishlist,
  deleteUserWishlistById,
} from "@/db/models/Wishlist";
import { z } from "zod";
import { ObjectId } from "mongodb";

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
  const userId = request.headers.get("x-user-id");

  try {
    const parsedData = userInputSchema.safeParse({ userId });
    if (!parsedData.success) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 400,
          message: "Invalid user ID",
          data: null,
          error: "User ID is required",
        },
        { status: 400 }
      );
    }

    const wishlist = await getWishlistByUserId(parsedData.data.userId);

    if (!wishlist || wishlist.length === 0) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 404,
          message: "No wishlist found",
          data: null,
          error: "Wishlist not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<MyResponse<typeof wishlist>>(
      {
        statusCode: 200,
        data: wishlist,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<MyResponse<null>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productId = request.headers.get("productid");
    const userId = request.headers.get("x-user-id");

    if (!productId || !userId) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 400,
          message: "Product ID and User ID are required",
          data: null,
          error: "Missing required headers",
        },
        { status: 400 }
      );
    }

    const parsedData = userInputSchema.safeParse({ userId });
    if (!parsedData.success) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 400,
          message: "Invalid user ID",
          data: null,
          error: "User ID is not valid",
        },
        { status: 400 }
      );
    }

    const result = await createUserWishlist({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    return NextResponse.json<MyResponse<typeof result>>(
      {
        statusCode: 201,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<MyResponse<null>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const productId = request.headers.get("productid");
    const userId = request.headers.get("x-user-id");

    if (!productId || !userId) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 400,
          message: "Product ID and User ID are required",
          data: null,
          error: "Missing required headers",
        },
        { status: 400 }
      );
    }

    const parsedData = userInputSchema.safeParse({ userId });
    if (!parsedData.success) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 400,
          message: "Invalid user ID",
          data: null,
          error: "User ID is not valid",
        },
        { status: 400 }
      );
    }

    const result = await deleteUserWishlistById({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (!result.deletedCount) {
      return NextResponse.json<MyResponse<null>>(
        {
          statusCode: 404,
          message: "Item not found",
          data: null,
          error: "Item to delete not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<MyResponse<typeof result>>(
      {
        statusCode: 200,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<MyResponse<null>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
