import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({
        description: 'ID of the post being commented',
        example: 1,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @ApiPropertyOptional({
        description: 'Comment text (required for ratings 2-4, min 10 characters)',
        example: 'This is a great post! Very informative.',
        minLength: 10,
        maxLength: 1000,
    })
    @IsString()
    @ValidateIf((o) => o.rating >= 2 && o.rating <= 4)
    @IsNotEmpty({ message: 'Текст отзыва обязателен при оценке от 2 до 4' })
    @MinLength(10, { message: 'Текст отзыва должен содержать не менее 10 символов при оценке от 2 до 4' })
    @MaxLength(1000)
    text?: string;

    @ApiProperty({
        description: 'Rating from 1 to 5',
        example: 5,
        minimum: 1,
        maximum: 5,
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'Оценка должна быть от 1 до 5' })
    @Max(5, { message: 'Оценка должна быть от 1 до 5' })
    rating: number;

    @ApiProperty({
        description: 'Author of the comment',
        example: 'John Doe',
        minLength: 2,
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Имя автора должно содержать не менее 2 символов' })
    @MaxLength(100, { message: 'Имя автора не должно превышать 100 символов' })
    author: string;
}
