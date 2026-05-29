import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiBody({ type: CreateCommentDto })
    @ApiResponse({ status: 201, description: 'Comment created successfully', type: CommentResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all comments' })
    @ApiResponse({ status: 200, description: 'List of all comments', type: [CommentResponseDto] })
    @ApiResponse({ status: 404, description: 'No comments found' })
    async findAll(): Promise<Comment[]> {
        return this.commentsService.findAll();
    }

    @Get('post/:postId')
    @ApiOperation({ summary: 'Get all comments for a specific post' })
    @ApiParam({ name: 'postId', description: 'Post ID', example: 1, type: Number })
    @ApiResponse({ status: 200, description: 'Comments found', type: [CommentResponseDto] })
    @ApiResponse({ status: 404, description: 'No comments found for this post' })
    async findAllByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<Comment[]> {
        return this.commentsService.findAllByPostId(postId);
    }

    @Get('post/:postId/average-rating')
    @ApiOperation({ summary: 'Get average rating for a post' })
    @ApiParam({ name: 'postId', description: 'Post ID', example: 1, type: Number })
    @ApiResponse({ status: 200, description: 'Average rating calculated', schema: { example: { averageRating: 4.5 } } })
    async getAverageRating(@Param('postId', ParseIntPipe) postId: number): Promise<{ averageRating: number }> {
        return this.commentsService.getAverageRatingByPostId(postId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a comment by ID' })
    @ApiParam({ name: 'id', description: 'Comment ID', example: '6a186c49abb15ca13f96ad6c' })
    @ApiResponse({ status: 200, description: 'Comment found', type: CommentResponseDto })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    async findOne(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a comment' })
    @ApiParam({ name: 'id', description: 'Comment ID' })
    @ApiBody({ type: UpdateCommentDto })
    @ApiResponse({ status: 200, description: 'Comment updated successfully', type: CommentResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a comment' })
    @ApiParam({ name: 'id', description: 'Comment ID' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        return this.commentsService.remove(id);
    }

    @Delete('post/:postId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete all comments for a post' })
    @ApiParam({ name: 'postId', description: 'Post ID', example: 1, type: Number })
    @ApiResponse({ status: 200, description: 'Comments deleted successfully' })
    async deleteAllByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<{ message: string; deletedCount: number }> {
        return this.commentsService.deleteAllByPostId(postId);
    }
}
