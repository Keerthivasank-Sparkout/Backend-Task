import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schema/user-schema.schema';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }
  create(createUserDto: CreateUserDto) {
    const newUser = createUserDto;
    this.userModel.create(newUser);
    return newUser;
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: string) {
    const ObjectId = new mongoose.Types.ObjectId(id)
    return this.userModel.findById(ObjectId);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const ObjectId = new mongoose.Types.ObjectId(id)
    return this.userModel.findByIdAndUpdate(ObjectId, updateUserDto, { new: true })
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid User ID');
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
