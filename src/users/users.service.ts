import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.models';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { UserRegisterDto } from './dtos/userRegisterDto';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  //Register a user

  async registerUser(user: UserRegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { username, email } = user;
    const newUser = new this.userModel({
      email: email,
      username: username,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return newUser.save();
  }

  //Find user by email for authService
  async login(email: string): Promise<User | undefined> {
    console.log('Inside User Serive ');
    return this.userModel.findOne({ email: email });
  }

  //get all user

  async getAllUser() {
    return this.userModel.find().select('_id username email date_added');
  }

  // upadting the data
  async updateUser(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  // deleting the data
  async deleteUser(id) {
    return this.userModel.findByIdAndRemove(id).select('_id username email');
  }

  async getForgetPasswordOtp(email: string) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new Error('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.forgetPasswordOtp = otp.toString();
    user.forgetPasswordExpiry =new Date( Date.now() + 20 * 60 * 1000);

    await user.save();
    return otp;
  }


  async passwordReset (email: string, otp: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.forgetPasswordOtp !== otp) {
      throw new Error('Invalid OTP');
    }

    if (user.forgetPasswordExpiry < new Date()) {
      throw new Error('OTP expired');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = password;
    user.forgetPasswordOtp = null;
    user.forgetPasswordExpiry = null;

    await user.save();
    return true;
  }
}
