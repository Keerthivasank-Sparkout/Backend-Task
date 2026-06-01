import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { createPostDto } from './dto/post-create.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Post()
  create(@Body() data: createPostDto) {
    return this.postsService.create(data);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
  ) {
    return this.postsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}