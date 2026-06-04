import { IsNotEmpty, IsString } from 'class-validator';

export class SetNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
