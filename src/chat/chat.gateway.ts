import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway(80,{ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: { socketId: string, message: string }) {
        this.server.emit('message', data);
    }

    @SubscribeMessage('file-message')
    handleFileMessage(@MessageBody() data: any) {
        console.log(data.formData);
    }
}