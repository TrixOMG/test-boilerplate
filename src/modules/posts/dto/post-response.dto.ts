import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
    @ApiProperty({
        description: 'Post ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: 'Post title',
        example: 'My First Post',
    })
    title: string;

    @ApiProperty({
        description: 'Post content',
        example: 'This is the content of my post...',
    })
    text: string;

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
