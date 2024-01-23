import { EntityManager } from "typeorm";
import { CreateImageDto } from '../dtos/CreateImage.dto';
import { Image } from "../entities/image.entity";
import { UpdateImageDto } from "../dtos/UpdateImage.dto";

export class ImageRepository {

      // save image
      async saveImage(image: Image, manager: EntityManager){
            try{
                   return await manager.createQueryBuilder(Image, 'image').insert().into('image').values(image).execute();
            }catch(err){
                  throw err;
            }     
      }

      // get image by record id
      async getImageByRecordId(recordId: string, manager: EntityManager){
            try{
                  return await manager.createQueryBuilder(Image, 'image').where('record_id = :recordId', {recordId}).getOne();
            }catch(err){
                  throw err;
            }
      }

      // update image
      async updateImage(recordId:string, toUpdate:UpdateImageDto, manager: EntityManager){
            try{
                  return await manager.createQueryBuilder(Image, 'image').update().set(toUpdate).where('record_id = :recordId', {recordId}).execute();
            }catch(err){
                  throw err;
            }
      }

      // delete image
      async deleteImage(recordId:string, manager: EntityManager){
            try{
                  return await manager.createQueryBuilder(Image, 'image').delete().where('record_id = :recordId', {recordId}).execute();
            }catch(err){
                  throw err;
            }
      }

}