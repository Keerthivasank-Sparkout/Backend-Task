import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Optional } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Optional()
    @IsString({ message: "The user must required" })
    UserName?: string

    @Optional()
    @IsString({ message: "The Phone Number must required" })
    @MinLength(10, { message: "The Phone number be in 10 characters" })
    @MaxLength(10, { message: "The Phone number be in 10 characters" })
    PhoneNumber?: string

    @Optional()
    @IsString({ message: "The email must required" })
    email?: string
}
