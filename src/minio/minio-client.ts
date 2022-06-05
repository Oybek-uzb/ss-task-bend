import { Module } from '@nestjs/common';
import {MinioModule, MinioService} from 'nestjs-minio-client';

@Module({
    controllers: [],
    imports: [
        MinioModule.register({
            endPoint: '127.0.0.1',
            port: 9001,
            useSSL: true,
            accessKey: 'minioadmin',
            secretKey: 'minioadmin',
        }),
    ],
    exports: [MinioService],
})
export class NestMinioClientModule {}
