import { IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';

export class UpdateCommentDto {
    @IsNumber()
    @IsOptional()
    postId?: number;

    @IsString()
    @IsOptional()
    @ValidateIf((comment) => comment.rating !== undefined && comment.rating >= 2 && comment.rating <= 4)
    @MinLength(10, { message: 'Текст отзыва должен содержать не менее 10 символов при оценке от 2 до 4' })
    @MaxLength(1000)
    text?: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(100)
    author?: string;
}
