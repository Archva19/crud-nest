import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema.js';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) throw new BadRequestException("User with this email already exists");
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid ID");
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new BadRequestException("User Not Found");
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid ID");
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
    if (!updatedUser) throw new BadRequestException("User Not Found");
    return updatedUser;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid ID");
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new BadRequestException("User Not Found");
    return deletedUser;
  }
}
