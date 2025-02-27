"use server";

import { ProfileRepositoryImpl } from "@/infrastructure/repositories/ProfileRepositoryImpl";
import { hashPassword } from "@/lib/auth";
import { redirect } from "next/navigation";

const profileRepository = new ProfileRepositoryImpl();

export async function getProfileById(id: number) {
  return profileRepository.getProfileById(id);
}

export async function updateProfile(
  id: number,
  email: string,
  password: string
) {
  if (!email || !password) {
    return;
  }

  const hashedPassword = await hashPassword(password);

  await profileRepository.updateProfile(id, email, hashedPassword);
}

export async function updateEmail(id: number, email: string) {
  await profileRepository.updateEmail(id, email);
}

export async function updatePassword(id: number, password: string) {
  const hashedPassword = await hashPassword(password);

  await profileRepository.updatePassword(id, hashedPassword);
}
