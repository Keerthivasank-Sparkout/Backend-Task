
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength,} from "class-validator";

export class UpdatePostDto{
    @IsOptional()
    @IsNotEmpty({message:'Title must be required'})
    @IsString({message:'Title must be string'})
    @MinLength(5,{message:'Title must be minimum 5 length'})
    @MaxLength(50,{message:'Title must be 50 character in the length'})
    title?: string

    @IsOptional()
    @IsNotEmpty({message:'Content must be required'})
    @IsString({message:'Content must be string'})
    @MinLength(5,{message:'Content must be minimum 5 length'})
    @MaxLength(50,{message:'Content must be 200 character in the length'})
    content?: string
    
    @IsOptional()
    @IsNotEmpty({message:'AuthorName must be required'})
    @IsString({message:'AuthorName must be string'})
    @MinLength(5,{message:'AuthorName must be minimum 3 length'})
    @MaxLength(50,{message:'AuthorName must be 25 character in the length'})
    authorName?: string

}