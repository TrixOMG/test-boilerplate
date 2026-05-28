import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationOptions, validationSchema } from './config/validation';
import { CommentsModule } from './modules/comments/comments.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema,
            validationOptions,
            envFilePath: '.env',
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),

        PostsModule,
        CommentsModule,
    ],
})
export class AppModule {}
