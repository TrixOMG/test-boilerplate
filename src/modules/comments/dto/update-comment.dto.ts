import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';

export class UpdateCommentDto {
    @ApiPropertyOptional({
        description: 'ID of the post being commented',
        example: 1,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    postId?: number;

    @ApiPropertyOptional({
        description: 'Comment text (required for ratings 2-4, min 10 characters)',
        example: 'Updated comment text',
        minLength: 10,
        maxLength: 1000,
    })
    @IsString()
    @IsOptional()
    @ValidateIf((comment) => comment.rating !== undefined && comment.rating >= 2 && comment.rating <= 4)
    @MinLength(10, { message: 'Текст отзыва должен содержать не менее 10 символов при оценке от 2 до 4' })
    @MaxLength(1000)
    text?: string;

    @ApiPropertyOptional({
        description: 'Rating from 1 to 5',
        example: 4,
        minimum: 1,
        maximum: 5,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;

    @ApiPropertyOptional({
        description: 'Author of the comment',
        example: 'Jane Doe',
        minLength: 2,
        maxLength: 100,
    })
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(100)
    author?: string;
}
