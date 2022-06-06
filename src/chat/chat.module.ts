import {Module} from "@nestjs/common";
import {ChatController} from "./chat.controller";
import {ChatService} from "./chat.service";
import {ChatGateway} from "./chat.gateway";
import {MinioModule} from "nestjs-minio-client";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env'
        }),
        MinioModule.register({
            endPoint: process.env.MINIO_ENDPOINT,
            port: +process.env.MINIO_PORT,
            useSSL: false,
            accessKey: 'admin',
            secretKey: 'password',
        })
    ],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
})
export class ChatModule {}
