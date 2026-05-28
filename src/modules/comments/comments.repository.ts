import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel(createCommentDto);
    return newComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findAllByPostId(postId: number): Promise<Comment[]> {
    return this.commentModel.find({ postId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment | null> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true, runValidators: true })
      .exec();
  }

  async delete(id: string): Promise<Comment | null> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }

  async getAverageRatingByPostId(postId: number): Promise<number> {
    const result = await this.commentModel.aggregate([
      { $match: { postId } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } }
    ]).exec();

    return result.length > 0 ? Math.round(result[0].averageRating * 10) / 10 : 0;
  }

  async deleteAllByPostId(postId: number): Promise<number> {
    const result = await this.commentModel.deleteMany({ postId }).exec();
    return result.deletedCount || 0;
  }
}
