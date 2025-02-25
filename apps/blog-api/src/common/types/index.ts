import { Request } from "express"

export type TokenPayloadUser = {
  sub: string,
  username: string
}

export interface RequestWithUser extends Request {
  user: TokenPayloadUser
}
