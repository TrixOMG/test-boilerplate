import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    async findAll(): Promise<Comment[]> {
        return this.commentsService.findAll();
    }

    @Get('post/:postId')
    async findAllByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<Comment[]> {
        return this.commentsService.findAllByPostId(postId);
    }

    @Get('post/:postId/average-rating')
    async getAverageRating(@Param('postId', ParseIntPipe) postId: number): Promise<{ averageRating: number }> {
        return this.commentsService.getAverageRatingByPostId(postId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto
    ): Promise<Comment> {
        return this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        return this.commentsService.remove(id);
    }

    @Delete('post/:postId')
    @HttpCode(HttpStatus.OK)
    async deleteAllByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<{ message: string; deletedCount: number }> {
        return this.commentsService.deleteAllByPostId(postId);
    }
}
