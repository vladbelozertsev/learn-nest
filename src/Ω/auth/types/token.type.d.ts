export type TokenPayload = {
  id: number;
};

export type Token = TokenPayload & {
  iat: number;
  exp: number;
};
