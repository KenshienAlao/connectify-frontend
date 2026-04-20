import { RegisterSchema } from "@/validation/auth.schema";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request",
          code: "INVALID_REQUEST",
          data: validation.error.format(),
        },
        { status: 400 },
      );
    }

    const backendUrl = `${process.env.API_BACKEND_URL}/api/auth/register`;

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("[API_AUTH_REGISTER_ERROR]: ", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        code: "SERVER_ERROR",
      },
      { status: 500 },
    );
  }
}
