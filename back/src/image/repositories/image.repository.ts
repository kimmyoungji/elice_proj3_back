import { EntityManager } from "typeorm";
import { CreateImageDto } from '../dtos/CreateImage.dto';
import { Image } from "../entities/image.entity";

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
      async updateImage(){

      }

      // delete image
      async deleteImage(){
      
      }

}