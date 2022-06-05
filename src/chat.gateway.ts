import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: { socketId: string, message: string }) {
        this.server.emit('message', data);
    }
}