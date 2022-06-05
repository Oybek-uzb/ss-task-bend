import { Injectable } from '@nestjs/common';
import {MinioService} from "nestjs-minio-client";
import {BucketItemFromList} from "minio";

@Injectable()
export class ChatService {
    constructor(private readonly minioClient: MinioService) {}

    async receiveFile(body: any): Promise<BucketItemFromList[]> {
        const minioBuckets = await this.minioClient.client.listBuckets();
        console.log(minioBuckets);
        return minioBuckets;
    }
}
