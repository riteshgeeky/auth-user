import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.models';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  //Register a user

  async registerUser(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { username, email } = user;
    const newUser = new this.userModel({
      email: email,
      username: username,
      password: hashedPassword,
    });
    return newUser.save();
  }

  //Find user by email for authService
  async login(email: string): Promise<User | undefined> {
    console.log('Inside User Serive ')
    return this.userModel.findOne({ email: email });
  }

// upadting the data
  async updateUser(id,data):Promise<User>{
    return this.userModel.findByIdAndUpdate(id,data,{new:true})
  }

  // deleting the data 
  async deleteUser(id){
    return this.userModel.findByIdAndRemove(id)
  }

}
