import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiBody({ type: CreatePostDto })
    @ApiResponse({ status: 201, description: 'Post created successfully', type: PostResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(createPostDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'List of all posts', type: [PostResponseDto] })
    @ApiResponse({ status: 404, description: 'No posts found' })
    async findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a post by ID' })
    @ApiParam({ name: 'id', description: 'Post UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @ApiResponse({ status: 200, description: 'Post found', type: PostResponseDto })
    @ApiResponse({ status: 404, description: 'Post not found' })
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a post' })
    @ApiParam({ name: 'id', description: 'Post UUID' })
    @ApiBody({ type: UpdatePostDto })
    @ApiResponse({ status: 200, description: 'Post updated successfully', type: PostResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 404, description: 'Post not found' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a post' })
    @ApiParam({ name: 'id', description: 'Post UUID' })
    @ApiResponse({ status: 200, description: 'Post deleted successfully' })
    @ApiResponse({ status: 404, description: 'Post not found' })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
        return this.postsService.remove(id);
    }

    @Get('search/title/:title')
    @ApiOperation({ summary: 'Search posts by title' })
    @ApiParam({ name: 'title', description: 'Post title to search', example: 'My Post' })
    @ApiResponse({ status: 200, description: 'Posts found', type: [PostResponseDto] })
    async findByTitle(@Param('title') title: string): Promise<PostEntity[]> {
        return this.postsService.findByTitle(title);
    }
}
