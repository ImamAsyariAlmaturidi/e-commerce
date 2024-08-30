"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  getTotalProductCount,
} from "@/db/models/Product";
import { z } from "zod";

const userInputSchema = z.object({
  name: z.string().nonempty("name cannot be empty"),
  slug: z.string().nonempty("slug cannot be empty"),
  description: z.string().nonempty("description cannot be empty"),
  excerpt: z.string().nonempty("excerpt cannot be empty"),
  price: z.number().positive("price must be greater than 0"),
  tags: z.array(z.string().min(1, "at least have 1 tag")),
  thumbnail: z.string().nonempty("thumbnail cannot be empty"),
  images: z
    .array(z.string().nonempty("each image must be a non-empty string"))
    .min(1, "at least have 1 image"),
});

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
  totalProducts?: number;
};

export async function GET(request: NextRequest) {
  try {
    const name = request.headers.get("name") || "";
    const skip = parseInt(request.headers.get("skip") || "0", 10);
    const limit = parseInt(request.headers.get("limit") || "10", 10);

    if (isNaN(skip) || isNaN(limit) || limit <= 0) {
      throw new Error("Invalid pagination parameters");
    }

    const products = await getProducts(skip, limit, name);
    const totalProducts = await getTotalProductCount();

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        data: products,
        totalProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        totalProducts: 0,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      const errorDetails = parsedData.error.issues
        .map((issue) => `${issue.path[0]} - ${issue.message}`)
        .join(", ");
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: errorDetails,
          totalProducts: 0,
        },
        {
          status: 400,
        }
      );
    }

    const result = await createProduct(parsedData.data);
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        data: result,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: error.errors
            .map((e) => `${e.path[0]} - ${e.message}`)
            .join(", "),
          totalProducts: 0,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        totalProducts: 0,
      },
      {
        status: 500,
      }
    );
  }
}
