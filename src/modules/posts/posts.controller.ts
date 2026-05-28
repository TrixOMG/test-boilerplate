import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(createPostDto);
    }

    @Get()
    async findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePostDto: UpdatePostDto
    ): Promise<PostEntity> {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
        return this.postsService.remove(id);
    }

    @Get('search/title/:title')
    async findByTitle(@Param('title') title: string): Promise<PostEntity[]> {
        return this.postsService.findByTitle(title);
    }
}
