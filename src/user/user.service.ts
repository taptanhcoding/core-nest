import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>
    ) { }

  async create(data: User) {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    const newUser = await this.userModel.create(data)
    return newUser
  }


  findAll() {
    return `This action returns all user`;
  }

  async findOne(query: any,option?:any) {
    return await this.userModel.findOne(query,option)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
