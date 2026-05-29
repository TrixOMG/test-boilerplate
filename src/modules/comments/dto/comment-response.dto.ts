import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
    @ApiProperty({
        description: 'Comment ID',
        example: '6a186c49abb15ca13f96ad6c',
    })
    id: string;

    @ApiProperty({
        description: 'ID of the post',
        example: 1,
    })
    postId: number;

    @ApiProperty({
        description: 'Comment text',
        example: 'Great post!',
        required: false,
    })
    text: string;

    @ApiProperty({
        description: 'Rating',
        example: 5,
        minimum: 1,
        maximum: 5,
    })
    rating: number;

    @ApiProperty({
        description: 'Author name',
        example: 'John Doe',
    })
    author: string;

    @ApiProperty({
        description: 'Creation date',
        example: '2026-05-28T16:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update date',
        example: '2026-05-28T16:00:00.000Z',
    })
    updatedAt: Date;
}
