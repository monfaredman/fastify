import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (createUserDto && Object.keys(createUserDto).length) {
      const { first_name, last_name, email, age } = createUserDto;
      const user = this.userRepository.create({
        first_name,
        last_name,
        email,
        age,
      });
      return await this.userRepository.save(user);
    }

    // const user = this.userRepository.create({
    //   first_name: 'Moslem',
    //   last_name: 'Monfared',
    //   email: 'moslem@gmail',
    //   age: 25,
    // });
  }

  async insert(createUserDto: CreateUserDto) {
    if (createUserDto && Object.keys(createUserDto).length) {
      const { first_name, last_name, email, age } = createUserDto;
      return await this.userRepository.insert({
        first_name,
        last_name,
        email,
        age,
      });
    }
    // return await this.userRepository.insert({
    //   first_name: 'Muslera',
    //   last_name: 'Monfared2',
    //   email: 'moslem2@gmail',
    //   age: 26,
    // });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
