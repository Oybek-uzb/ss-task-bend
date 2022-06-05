import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async receiveFile(@UploadedFile() file): Promise<string> {
        return await this.chatService.receiveFile(file);
    }
}