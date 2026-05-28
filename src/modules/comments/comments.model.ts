// src/modules/comments/comments.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true, type: Number })
    postId: number;

    @Prop({ required: true, minlength: 1, maxlength: 1000 })
    text: string;

    @Prop({ required: true, min: 1, max: 5 })
    rating: number;

    @Prop({ required: true, minlength: 2, maxlength: 100 })
    author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
