import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message:"The user must required"})
    UserName:string

    @IsString({message:"The Phone Number must required"})
    @MinLength(10,{message:"The Phone number be in 10 characters"})
    @MaxLength(10,{message:"The Phone number be in 10 characters"})
    PhoneNumber:string

    @IsString({message:"The email must required"})
    email:string
}
