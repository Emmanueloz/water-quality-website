import { Profile } from "../models/profile";

export interface ProfileRepository {
    getProfileById(profileId: number): Promise<Profile[]>;
    updateProfile(profileId: number, email: string, password: string): Promise<void>;
}