import { IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateCommentDto {
    @IsNumber()
    @IsOptional()
    postId?: number;

    @IsString()
    @IsOptional()
    @MinLength(1)
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
