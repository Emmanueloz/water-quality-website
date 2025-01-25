interface IUserToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export type { IUserToken };
