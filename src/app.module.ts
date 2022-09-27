import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule} from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [UsersController],
  providers: [AppService],
})
export class AppModule {}
