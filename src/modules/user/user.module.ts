import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [UserEntity],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
