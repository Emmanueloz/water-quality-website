import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get("auth_token");
    if (authToken) {
      return NextResponse.json({ isAuthenticated: true });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error("Error verificando la sesión:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
