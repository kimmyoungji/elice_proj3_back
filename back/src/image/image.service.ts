import { DataSource } from 'typeorm';
import { CreateImageDto } from './dtos/CreateImage.dto';
import { Injectable } from "@nestjs/common";
import { ImageRepository } from "./repositories/image.repository";
import * as AWS from 'aws-sdk';
import { Image } from './entities/image.entity';
import { Update } from 'aws-sdk/clients/dynamodb';
import { UpdateImageDto } from './dtos/UpdateImage.dto';


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

    async saveImage(CreateImageDto: CreateImageDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const image = new Image().mapCreateImageDtoToEntity(CreateImageDto);
            const result =  this.imageRepository.saveImage(image, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async getImageByRecordId(recordId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = await this.imageRepository.getImageByRecordId(recordId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async updateImageByRecordId(recordId: string, updateImageDto: UpdateImageDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result =  this.imageRepository.updateImage(recordId,updateImageDto, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;  
        }finally{
            await queryRunner.release();
        }
    }


    async deleteImageByRecordId(recordId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = this.imageRepository.deleteImage(recordId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

}