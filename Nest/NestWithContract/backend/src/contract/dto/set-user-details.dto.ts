import { IsNotEmpty, IsString } from 'class-validator';

export class SetUserDetailsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;
}
