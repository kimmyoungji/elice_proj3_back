import { DataSource } from 'typeorm';
import { CreateImageDto } from './dtos/CreateImage.dto';
import { Injectable } from "@nestjs/common";
import { ImageRepository } from "./repositories/image.repository";
import * as AWS from 'aws-sdk';
import { Image } from './entities/image.entity';


@Injectable()
export class ImageService {
    private readonly s3;

    constructor(private imageRepository: ImageRepository,
        private dataSource: DataSource) {
        AWS.config.update({
            region: "ap-northeast-2",
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
        this.s3 = new AWS.S3();
    }
    
    async getPresignedUrlForPut(fileName: string) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET, 
            Key: fileName,
            Expires: 60 * 5,
        };
        const url = await this.s3.getSignedUrlPromise('putObject', params); 
        return url;
    }

    async createImage(CreateImageDto: CreateImageDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const image = new Image().mapCreateImageDtoToEntity(CreateImageDto);
            await this.imageRepository.saveImage(image, queryRunner.manager);
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    

}