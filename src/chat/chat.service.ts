import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MinioService} from "nestjs-minio-client";
import {BucketItemFromList} from "minio";

@Injectable()
export class ChatService {
    constructor(private readonly minioClient: MinioService) {}

    async receiveFile(body: any): Promise<string> {
        this.minioClient.client.putObject(
            "staff",
            body.originalname,
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
        return "ok";
    }
}
