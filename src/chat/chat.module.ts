import {Module} from "@nestjs/common";
import {ChatController} from "./chat.controller";
import {ChatService} from "./chat.service";
import {ChatGateway} from "./chat.gateway";
import {MinioModule} from "nestjs-minio-client";

@Module({
    imports: [MinioModule.register({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin',
    }),],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
})
export class ChatModule {}
