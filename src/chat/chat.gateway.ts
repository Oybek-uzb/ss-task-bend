import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Injectable} from "@nestjs/common";

@Injectable()
@WebSocketGateway(80,{ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: { socketId: string, message: string }) {
        this.server.emit('message', data);
    }

    @SubscribeMessage('file-message')
    handleFileMessage(@MessageBody() data: { socketId: string, orgFileName: string, url: string }) {
        this.server.emit('file-message', data)
    }
}