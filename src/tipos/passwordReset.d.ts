interface PasswordReset {
    id: number;
    userId: number;
    token: string;
    expiresAt: Date;
}