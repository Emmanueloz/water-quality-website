import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get("auth_token");
    
    if (authToken) {
      const valueToken = authToken?.value;
      const decoded = jwt.decode(valueToken);
      
      return NextResponse.json({ isAuthenticated: true, user: {id: decoded?.id, userName: decoded?.Usuario, rol: decoded?.rol} });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error("Error verificando la sesión:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
