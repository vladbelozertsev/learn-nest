export type TokenPayload = {
  id: number;
  email: string;
};

export type Token = TokenPayload & {
  iat: number;
  exp: number;
};
