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




@Controller()
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async registerUser(@Body() userDto: User) {
    return this.usersService.registerUser(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Put('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UserUpdateDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateData);
  }


  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }


}
