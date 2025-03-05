"use server";

import { MultiSessionsRepositoryImpl } from "@/infrastructure/repositories/MultiSessionsRepositoryImpl";
import { ProfileRepositoryImpl } from "@/infrastructure/repositories/ProfileRepositoryImpl";
import { hashPassword } from "@/lib/auth";

const multiSessionsRepository = new MultiSessionsRepositoryImpl();
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

export async function updateUserInfo(id: number, email: string, phone: string) {
  await profileRepository.updateUserInfo(id, email, phone);
}

export async function updatePassword(id: number, password: string) {
  const hashedPassword = await hashPassword(password);

  await profileRepository.updatePassword(id, hashedPassword);
}

export async function getSessions(id: number) {
  return multiSessionsRepository.getAllByUserId(id);
}

export async function deleteSession(id: number, token: string) {
  return await multiSessionsRepository.deleteByToken(id, token);
}

export async function deleteAllSessions(id: number, excludeToken: string) {
  await multiSessionsRepository.deleteByUserId(id, excludeToken);
}
