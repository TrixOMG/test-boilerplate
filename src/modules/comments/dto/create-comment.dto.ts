import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';

export class CreateCommentDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsString()
    @ValidateIf((o) => o.rating >= 2 && o.rating <= 4)
    @IsNotEmpty({ message: 'Текст отзыва обязателен при оценке от 2 до 4' })
    @MinLength(10, { message: 'Текст отзыва должен содержать не менее 10 символов при оценке от 2 до 4' })
    @MaxLength(1000)
    text?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'Оценка должна быть от 1 до 5' })
    @Max(5, { message: 'Оценка должна быть от 1 до 5' })
    rating: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Имя автора должно содержать не менее 2 символов' })
    @MaxLength(100, { message: 'Имя автора не должно превышать 100 символов' })
    author: string;
}
