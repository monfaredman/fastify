import { UserEntity } from "src/modules/user/entities/user.entity";

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity;
    }
  }
}
