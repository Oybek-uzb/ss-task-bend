import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MinioService} from "nestjs-minio-client";
import * as bcrypt from 'bcrypt'
import {ChatGateway} from "./chat.gateway";

@Injectable()
export class ChatService {
    constructor(private readonly minioClient: MinioService) {}

    async receiveFile(body: any): Promise<{ url: string, orgFileName: string }> {
        const orgFileName = body.originalname;
        const splitFileName = orgFileName.split('.');
        const fileExtension = '.' + splitFileName[splitFileName.length - 1];

        const hashedFileName = await bcrypt.hash(orgFileName, 10) + fileExtension

        this.minioClient.client.putObject(
            "staff",
            hashedFileName,
            body.buffer,
            body.mimetype,
            function (err, res) {
                if (err) {
                    throw new HttpException(
                        'Error uploading file',
                        HttpStatus.BAD_REQUEST,
                    );
                }
            });

        return {
            url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${hashedFileName}`,
            orgFileName
        };
    }
}
