import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema.schema';
import { JwtModule } from '@nestjs/jwt';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/Jwt.strategy';
import { RolesGaurd } from './guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '15m',
    //   },
    // }),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RolesGaurd],
  exports:[AuthService,RolesGaurd]
})
export class AuthModule { }
