import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostDto {
    @ApiPropertyOptional({
        description: 'Post title',
        example: 'Updated Post Title',
        minLength: 3,
        maxLength: 100,
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    title?: string;

    @ApiPropertyOptional({
        description: 'Post content',
        example: 'This is the updated content...',
        minLength: 10,
        maxLength: 5000,
    })
    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(5000)
    text?: string;
}
