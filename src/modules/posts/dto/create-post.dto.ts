import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        description: 'Post title',
        example: 'My First Post',
        minLength: 3,
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @ApiProperty({
        description: 'Post content',
        example: 'This is the content of my post...',
        minLength: 10,
        maxLength: 5000,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(5000)
    text: string;
}
