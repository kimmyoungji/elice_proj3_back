import { Injectable } from "@nestjs/common";
import { DataSource } from 'typeorm';
import { Image } from './entities/image.entity';
import { ImageRepository } from "./repositories/image.repository";
import { CreateImageDto } from './dtos/CreateImage.dto';
import { UpdateImageDto } from './dtos/UpdateImage.dto';
import { CreateSplitImageDto } from './dtos/CreateSplitImage.dto';
import { UpdateSplitImageDto } from './dtos/UpdateSplitImage.dto';
import { SplitImage } from './entities/splitImage.entity';
import * as AWS from 'aws-sdk';
import { S3 } from '@aws-sdk/client-s3';
import { SplitImageRepository } from "./repositories/splitImage.repository";

@Injectable()
export class ImageService {
    private readonly s3;

    constructor(
        private imageRepository: ImageRepository,
        private splitImageRepository: SplitImageRepository,
        private dataSource: DataSource) {
        // JS SDK v3 does not support global configuration.
        // Codemod has attempted to pass values to each service client in this file.
        // You may need to update clients outside of this file, if they use global config.
        this.s3 = new S3({
            region: "ap-northeast-2",

            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    
    /* 프리사인드 유알엘 받아오기 */
    async getPresignedUrlForPut(fileName: string) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET, 
            Key: fileName,
            Expires: 60 * 5,
        };
        const url = await this.s3.getSignedUrlPromise('putObject', params); 
        return url;
    }

    /* 이미지 CRUD */
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

    async getImageByImageId(imageId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = await this.imageRepository.getImageByImageId(imageId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async updateImageByImageId(imageId: string, updateImageDto: UpdateImageDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result =  this.imageRepository.updateImage(imageId,updateImageDto, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;  
        }finally{
            await queryRunner.release();
        }
    }


    async deleteImageByImageId(ImageId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = this.imageRepository.deleteImage(ImageId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }


    /* 이미지 분석 데이터 CRUD */
    async saveSplitImage(createSplitImageDto: CreateSplitImageDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const splitImage = new SplitImage().mapCreateSplitImageDtoToEntity(createSplitImageDto);
            const result =  this.splitImageRepository.saveSplitImage(splitImage, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async getSplitImageByImageId(imageId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = await this.splitImageRepository.getSplitImageByImageId(imageId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async updateSplitImageBySplitImageId(splitImageId: string, updateSplitImageDto: UpdateSplitImageDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const SplitImageToUpdate = new SplitImage().mapUpdateSplitImageDtoToEntity(updateSplitImageDto);
            const result =  this.splitImageRepository.updateSplitImage(splitImageId,SplitImageToUpdate, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;  
        }finally{
            await queryRunner.release();
        }
    }

    async deleteSplitImageByImageId(imageId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = this.splitImageRepository.deleteSplitImageByImageId(imageId, queryRunner.manager);
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