import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from './user.models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserUpdateDto } from './userUpdate.dto';
import { UserRegisterDto } from './dtos/userRegisterDto';




@Controller()
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async registerUser(@Body() userDto: UserRegisterDto) {
    return this.usersService.registerUser(userDto);
  }



  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('users')
  async getAllUser() {
    return this.usersService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UserUpdateDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateData);
  }


  @Post('forgetPasswordOtp')
  async getForgetPasswordOtp(@Body('email') email: string) {
    const otp= await this.usersService.getForgetPasswordOtp(email);
    return {
      otp: otp,
    };
  }

  @Post('passwordreset')
  async passwordReset(@Body('email') email: string, @Body('otp') otp: string, @Body('password') password: string) {
    return this.usersService.passwordReset(email, otp, password);
  }



}
