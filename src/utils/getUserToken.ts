import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserToken(): Promise<UserProfile> {
  const auth_token = await getToken();

  const user_decode = jwt.decode(auth_token);

  const user = user_decode as UserProfile;

  return user;
}

export async function getToken(): Promise<string> {
  const result = await cookies();

  const auth_token = result.get("auth_token")?.value ?? "";

  return auth_token;
}
