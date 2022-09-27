import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './user.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://riteshbenjwal:789456123@cluster-nestjs.mis8tc9.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
