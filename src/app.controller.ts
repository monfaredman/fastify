import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('user')
  // create(): string {
  //   return 'This action adds a new user';
  // }

  // @Get('users')
  // getAllUsers(): string {
  //   return 'This action returns all users';
  // }
}
