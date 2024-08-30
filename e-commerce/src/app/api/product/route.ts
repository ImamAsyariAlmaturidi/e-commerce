"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  getTotalProductCount,
} from "@/db/models/Product";
import { z } from "zod";
const userInputSchema = z.object({
  name: z.string({
    message: "name cannot be empty",
  }),
  slug: z.string({
    message: "slug cannot be empty",
  }),
  description: z.string({
    message: "description cannot be empty",
  }),
  excerpt: z.string({
    message: "excerpt cannot be empty",
  }),
  price: z.number({
    message: "price cannot be empty",
  }),
  tags: z
    .string({
      message: "tags cannot be empty",
    })
    .length(1, {
      message: "at least have 1 tags",
    }),
  thumbnail: z.string(),
  images: z.string().length(1, {
    message: "at least have 1 images",
  }),
});
type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
  totalProducts: number;
};
export async function GET(request: NextRequest) {
  try {
    const name = request.headers.get("name");
    const skip = parseInt(request.headers.get("skip") as string, 10) || 0;
    const limit = parseInt(request.headers.get("limit") as string, 10) || 10;

    let productss;
    if (!name) {
      productss = await getProducts(skip, limit);
    } else {
      productss = await getProducts(skip, limit, name);
    }
    const totalProducts = await getTotalProductCount();
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        data: productss,
        totalProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
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
      throw parsedData.error;
    }
    const result = await createProduct(data);
    return NextResponse.json({
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);

      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
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
        message: "Internal Server Error !",
        totalProducts: 0,
      },
      {
        status: 500,
      }
    );
  }
}
