import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    title?: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(5000)
    text?: string;
}
