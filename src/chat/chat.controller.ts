import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async receiveFile(@UploadedFile() file): Promise<string> {
        console.log(file)
        const mb = await this.chatService.receiveFile("let")
        console.log(mb)
        return "Hello";
    }
}