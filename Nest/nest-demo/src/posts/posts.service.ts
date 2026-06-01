import { Injectable, NotFoundException } from '@nestjs/common';
// import { Posts } from './interface/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schems';
import { Model } from 'mongoose';
import {createPostDto} from './dto/post-create.dto'
import {UpdatePostDto} from './dto/update-post.dto'

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private readonly postModel: Model<Post>,
    ) { }
    async create(data: createPostDto) {
        return await this.postModel.create(data);
    }

    async findAll() {
        return await this.postModel.find();
    }

    async findOne(id: string) {
        return await this.postModel.findById(id);
    }

    async update(
        id: string,
        data: UpdatePostDto,
    ) {
        return await this.postModel.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );
    }

    async remove(id: string) {
        return await this.postModel.findByIdAndDelete(id);
    }
}
