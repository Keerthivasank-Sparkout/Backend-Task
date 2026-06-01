import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export class PostExistPipe implements PipeTransform{
    constructor(private readonly postService : PostsService){}
    transform(value: any, metadata: ArgumentMetadata) {
        try{
            this.postService.findOne(value)
        }catch(err){
            throw new NotFoundException(`Post with id ${value} is Not Found`)
        }
        return value;
    }
}