import { ProfileDto } from "./dto/profile.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from './entities/user.entity';
import {
  // And,
  // FindOptionsWhere,
  // LessThanOrEqual,
  // MoreThanOrEqual,
  Repository,
} from "typeorm";
import { isEmail, isNumber } from "class-validator";
// import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private userRepository: Repository<UserEntity>,
  //   @InjectRepository(ProfileEntity)
  //   private profileRepository: Repository<ProfileEntity>
  // ) {}
  // async create(createUserDto: CreateUserDto) {
  //   if (createUserDto && Object.keys(createUserDto).length) {
  //     const { first_name, last_name, email, age } = createUserDto;
  //     const user = this.userRepository.create({
  //       first_name,
  //       last_name,
  //       email,
  //       age,
  //     });
  //     return await this.userRepository.save(user);
  //   }
  //   // const user = this.userRepository.create({
  //   //   first_name: 'Moslem',
  //   //   last_name: 'Monfared',
  //   //   email: 'moslem@gmail',
  //   //   age: 25,
  //   // });
  // }
  // async insert(createUserDto: CreateUserDto) {
  //   if (createUserDto && Object.keys(createUserDto).length) {
  //     const { first_name, last_name, email, age } = createUserDto;
  //     return await this.userRepository.insert({
  //       first_name,
  //       last_name,
  //       email,
  //       age,
  //     });
  //   }
  //   // return await this.userRepository.insert({
  //   //   first_name: 'Muslera',
  //   //   last_name: 'Monfared2',
  //   //   email: 'moslem2@gmail',
  //   //   age: 26,
  //   // });
  // }
  // async findAll() {
  //   // const where: FindOptionsWhere<UserEntity> = {};
  //   // if (search) {
  //   //   const date = new Date();
  //   //   const started_at = new Date(date.setUTCHours(0, 0, 0, 0));
  //   //   const finished_at = new Date(date.setUTCHours(23, 59, 59, 999));
  //   //   where['created_at'] = And(
  //   //     MoreThanOrEqual(started_at),
  //   //     LessThanOrEqual(finished_at),
  //   //   );
  //   //   where['first_name'] = search;
  //   // }
  //   return await this.userRepository.find({
  //     // where,
  //     // where: {  },
  //     order: { id: "ASC" },
  //   });
  // }
  // async orderData() {
  //   const data = await this.userRepository.find({
  //     where: {},
  //     order: { id: "ASC" },
  //   });
  //   return data;
  // }
  // async pagination(paginationDto: { page: number; limit: number }) {
  //   let { limit = 5, page = 0 } = paginationDto;
  //   if (!page || page <= 1) page = 0;
  //   else page = page - 1;
  //   if (!limit || limit <= 0) limit = 5;
  //   const skip = page * limit;
  //   return await this.userRepository.find({
  //     order: { id: "ASC" },
  //     skip,
  //     take: limit,
  //   });
  // }
  // async selectionUser() {
  //   return await this.userRepository.find({
  //     select: ["first_name", "last_name"],
  //   });
  // }
  // async blogsOfUser(userId: number) {
  //   return await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ["blogs"],
  //   });
  // }
  // async findOne(id: number) {
  //   const user = await this.userRepository.findOneBy({ id });
  //   if (!user) throw new NotFoundException();
  //   return user;
  // }
  // async updateChangedField(id: number, updateUserDto: UpdateUserDto) {
  //   const user = await this.findOne(id);
  //   const { age, email, first_name, last_name } = updateUserDto;
  //   if (age && isNumber(age)) user.age = age;
  //   if (email && isEmail(email)) user.email = email;
  //   if (first_name) user.first_name = first_name;
  //   if (last_name) user.last_name = last_name;
  //   await this.userRepository.save(user);
  //   return { message: "User updated successfully" };
  // }
  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   // const user = await this.findOne(id);
  //   const { age, email, first_name, last_name } = updateUserDto;
  //   this.userRepository.update(id, { age, email, first_name, last_name });
  //   return { message: "User updated successfully" };
  // }
  // // async findAll() {
  // //   return await this.userRepository.find({
  // //     where: { first_name: ILike('%m%'), age: MoreThan(25) },
  // //   });
  // // }
  // async remove(id: number) {
  //   const user = await this.findOne(id);
  //   await this.userRepository.remove(user);
  //   return { message: "User deleted successfully" };
  // }
  // async delete(id: number) {
  //   this.findOne(id);
  //   await this.userRepository.delete({ id });
  //   return { message: "User deleted successfully" };
  // }
  // async createProfile(profileDto: ProfileDto) {
  //   const { bio, photo, userId } = profileDto;
  //   const user = await this.userRepository.findOneBy({ id: userId });
  //   if (user) {
  //     const profile = await this.profileRepository.findOneBy({
  //       userId,
  //     });
  //     if (profile) {
  //       if (bio) profile.bio = bio;
  //       if (photo) profile.photo = photo;
  //       await this.profileRepository.save(profile);
  //     } else {
  //       let newProfile = this.profileRepository.create({
  //         bio,
  //         photo,
  //         userId,
  //       });
  //       newProfile = await this.profileRepository.save(newProfile);
  //       user.profileId = newProfile.id;
  //       await this.userRepository.save(user);
  //     }
  //     return { message: "Profile created successfully" };
  //   } else {
  //     throw new NotFoundException("User not found");
  //   }
  // }
  // async findUserWithProfile(id: number) {
  //   const user = await this.userRepository.findOne({
  //     where: { id },
  //     relations: ["profile"],
  //   });
  //   if (!user) throw new NotFoundException();
  //   return user;
  // }
}
