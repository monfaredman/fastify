import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { AuthModule } from "../auth/auth.module"; // Import AuthModule
import { UserController } from "./user.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule, // Import AuthModule to make JwtService available
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
