import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({
    message: 'User name is required',
  })
  @IsString({
    message: 'User name must be a string',
  })
  userName: string;

  @IsNotEmpty({
    message: 'Phone number is required',
  })
  phoneNumber: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({}, {
    message: 'Please enter a valid email address',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(6, {
    message: 'Password must contain at least 6 characters',
  })
  password: string;
}