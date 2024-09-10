import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ProfileDto } from "./dto/profile.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('/create')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  // @Post('/insert')
  // insert(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  // @Get('/order')
  // orderData() {
  //   return this.userService.orderData();
  // }
  // @Get('/pagination')
  // pagination(@Query() paginationDto: { page: number; limit: number }) {
  //   return this.userService.pagination(paginationDto);
  // }
  // @Get('/selection')
  // selectionUser() {
  //   return this.userService.selectionUser();
  // }
  // @Get('/blogs/:userId')
  // findAllBlogsOfUser(@Param('userId', ParseIntPipe) userId: number) {
  //   return this.userService.blogsOfUser(userId);
  // }

  // @Patch(':id')
  // updateFields(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.updateChangedField(+id, updateUserDto);
  // }
  // @Put('/update/:id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // //   return this.userService.update(+id, updateUserDto);
  // // }

  // @Delete('/remove/:id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
  // @Delete('/delete/:id')
  // delete(@Param('id') id: string) {
  //   return this.userService.delete(+id);
  // }
  // @Post('/profile')
  // createProfile(@Body() profileDto: ProfileDto) {
  //   return this.userService.createProfile(profileDto);
  // }

  // @Get('/profile/:id')
  // findUserWithProfile(@Param('id') id: string) {
  //   return this.userService.findUserWithProfile(+id);
  // }
}
