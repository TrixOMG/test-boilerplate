import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const post = this.postRepository.create(createPostDto);
        return await this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<Post | null> {
        return await this.postRepository.findOne({ where: { id } });
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
        await this.postRepository.update(id, updatePostDto);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.postRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async findByTitle(title: string): Promise<Post[]> {
        return await this.postRepository.find({
            where: { title },
            order: { createdAt: 'DESC' }
        });
    }
}
