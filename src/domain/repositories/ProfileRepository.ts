import { Profile } from "../models/profile";

export interface ProfileRepository {
    getProfileById(profileId: number): Promise<Profile  | null>;
    updateProfile(profileId: number, email: string, password: string): Promise<void>;
}