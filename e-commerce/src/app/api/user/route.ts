"use server";
import { NextRequest, NextResponse } from "next/server";
import { createUser, getUser } from "@/db/models/User";
import { z } from "zod";
const userInputSchema = z.object({
  firstName: z.string({
    message: "first name cannot be empty",
  }),
  lastName: z.string({
    message: "last name cannot be empty",
  }),
  username: z.string({
    message: "username cannot be empty",
  }),
  email: z.string().email({
    message: "must be email format",
  }),
  password: z
    .string({
      message: "password cannot be empty",
    })
    .length(5, {
      message: "length password atleast 5 character",
    }),
  phoneNumber: z.string({
    message: "phoneNumber cannot be empty",
  }),
});
type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export async function GET() {
  try {
    const users = await getUser();

    if (!users || users.length === 0) {
      return NextResponse.json<MyResponse<never>>({
        statusCode: 404,
        message: "No users found",
      });
    }

    return NextResponse.json<MyResponse<typeof users>>({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = userInputSchema.safeParse(data);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    const result = await createUser(data);
    return NextResponse.json<MyResponse<typeof result>>({
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    return NextResponse.json<MyResponse<never>>({
      statusCode: 400,
      message: "Bad Request",
      error: (error as Error).message,
    });
  }
}
