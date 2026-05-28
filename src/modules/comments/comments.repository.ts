import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.model';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: any): Promise<Comment> {
    const newComment = new this.commentModel(createCommentDto);
    return newComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findById(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  async update(id: string, updateData: any): Promise<Comment | null> {
    return this.commentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Comment | null> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
