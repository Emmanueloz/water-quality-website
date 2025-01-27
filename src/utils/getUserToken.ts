import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserToken(): Promise<IUserToken> {
  const result = await cookies();

  const auth_token = result.get("auth_token")?.value ?? "";

  const user_decode = jwt.decode(auth_token);

  const user = user_decode as IUserToken;

  return user;
}
