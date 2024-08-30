"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  getUser,
  getUserByEmail,
  getUserByUsername,
} from "@/db/models/User";
import { z } from "zod";

// Define the schema for user input validation
const userInputSchema = z.object({
  firstName: z.string().min(1, { message: "First name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last name cannot be empty" }),
  username: z.string().min(1, { message: "Username cannot be empty" }),
  email: z.string().email({ message: "Must be a valid email format" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
  phoneNumber: z.string().min(1, { message: "Phone number cannot be empty" }),
});

// Define the response type
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

    // Validate the data with Zod
    const parsedData = userInputSchema.safeParse(data);
    if (!parsedData.success) {
      const errors = parsedData.error.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));

      return NextResponse.json<MyResponse<never>>({
        statusCode: 400,
        message: "Validation failed",
        error: JSON.stringify(errors),
      });
    }

    const { email, username } = parsedData.data;
    const existingEmail = await getUserByEmail(email);
    const existingUsername = await getUserByUsername(username);

    if (existingEmail) {
      return NextResponse.json<MyResponse<never>>({
        statusCode: 400,
        message: "Email already in use",
      });
    } else if (existingUsername) {
      return NextResponse.json<MyResponse<never>>({
        statusCode: 400,
        message: "Username already in use",
      });
    } else {
      const result = await createUser(parsedData.data);
      return NextResponse.json<MyResponse<typeof result>>({
        statusCode: 201,
        data: result,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));

      return NextResponse.json<MyResponse<never>>({
        statusCode: 400,
        message: "Validation failed",
        error: JSON.stringify(errors),
      });
    }

    // Handle other errors
    return NextResponse.json<MyResponse<never>>({
      statusCode: 500,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}
