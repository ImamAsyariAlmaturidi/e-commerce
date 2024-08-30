"use server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
interface ApiResponse {
  statusCode: number;
  message: string;
  error: string;
}
export async function doRegister(formData: { [key: string]: any }) {
  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const message: ApiResponse = await res.json();
    return message;
  } catch (error) {
    throw error;
  }
}
