import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        try {
            return await this.postsRepository.create(createPostDto);
        } catch (error) {
            throw new ConflictException('Failed to create post');
        }
    }

    async findAll(): Promise<Post[]> {
        const posts = await this.postsRepository.findAll();
        if (!posts.length) {
            throw new NotFoundException('No posts found');
        }
        return posts;
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException(`Post with ID "${id}" not found`);
        }
        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException(`Post with ID "${id}" not found`);
        }

        const updated = await this.postsRepository.update(id, updatePostDto);
        if (!updated) {
            throw new ConflictException('Failed to update post');
        }
        return updated;
    }

    async remove(id: string): Promise<{ message: string }> {
        const deleted = await this.postsRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Post with ID "${id}" not found`);
        }
        return { message: `Post with ID "${id}" has been deleted successfully` };
    }

    async findByTitle(title: string): Promise<Post[]> {
        return await this.postsRepository.findByTitle(title);
    }
}
