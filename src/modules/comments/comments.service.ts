import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comments.model';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        try {
            return await this.commentsRepository.create(createCommentDto);
        } catch (error) {
            throw new BadRequestException('Failed to create comment');
        }
    }

    async findAll(): Promise<Comment[]> {
        const comments = await this.commentsRepository.findAll();
        if (!comments.length) {
            throw new NotFoundException('No comments found');
        }
        return comments;
    }

    async findAllByPostId(postId: number): Promise<Comment[]> {
        const comments = await this.commentsRepository.findAllByPostId(postId);
        if (!comments.length) {
            throw new NotFoundException(`No comments found for post with ID "${postId}"`);
        }
        return comments;
    }

    async findOne(id: string): Promise<Comment> {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            throw new NotFoundException(`Comment with ID "${id}" not found`);
        }
        return comment;
    }

    async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            throw new NotFoundException(`Comment with ID "${id}" not found`);
        }

        const updated = await this.commentsRepository.update(id, updateCommentDto);
        if (!updated) {
            throw new BadRequestException('Failed to update comment');
        }
        return updated;
    }

    async remove(id: string): Promise<{ message: string }> {
        const deleted = await this.commentsRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Comment with ID "${id}" not found`);
        }
        return { message: `Comment with ID "${id}" has been deleted successfully` };
    }

    async getAverageRatingByPostId(postId: number): Promise<{ averageRating: number }> {
        const averageRating = await this.commentsRepository.getAverageRatingByPostId(postId);
        return { averageRating };
    }

    async deleteAllByPostId(postId: number): Promise<{ message: string; deletedCount: number }> {
        const deletedCount = await this.commentsRepository.deleteAllByPostId(postId);
        return {
            message: `Deleted ${deletedCount} comments for post with ID "${postId}"`,
            deletedCount
        };
    }
}
