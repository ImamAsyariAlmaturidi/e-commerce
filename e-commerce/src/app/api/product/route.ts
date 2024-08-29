"use server";
import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/db/models/Product";
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
};
export async function GET(request: NextRequest) {
  console.log("INSIDE GET /api/users");
  console.log("x-user-id", request.headers.get("x-user-id"));
  console.log("x-user-email", request.headers.get("x-user-email"));
  console.log("x-custom-value", request.headers.get("x-custom-value"));
  try {
    const products = await getProducts();
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        data: products,
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
      },
      {
        status: 500,
      }
    );
  }
}