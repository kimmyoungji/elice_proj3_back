import { HealthInfo } from 'src/user/entities/health-info.entity';
import { DeleteResult, EntityManager, InsertResult, Timestamp, UpdateResult } from "typeorm";

export class HealthInfoRepository{

    // Create
    public async saveHealthInfo(healthInfo: HealthInfo, manager: EntityManager): Promise<InsertResult>{
        try{
            return await manager.createQueryBuilder(HealthInfo, "health_info").insert()
                                .into(HealthInfo).values(healthInfo).execute(); 
        }catch(err){
            throw err;
        }
    }

    // Read
    public async findHealthInfoByUserId(userId: string, manager: EntityManager): Promise<HealthInfo>{
        try{
            return await manager.createQueryBuilder(HealthInfo, "health_info").where("user_id = :userId", {userId}).getOne();
        }catch(err){
            throw err;
        }
    }

    // Update
    public async updateHealthInfoByUserId(healthInfoId: string, healthInfo:HealthInfo,  manager: EntityManager): Promise<UpdateResult>{
        try{
            return await manager.createQueryBuilder(HealthInfo, "health_info").update(HealthInfo).set(healthInfo).where("health_info_id = :healthInfoId",{healthInfoId}).execute();
        }catch(err){
            throw err;
        }
    }

    // Delete
    public async deleteHealthInfoByHealthInfoId(healthInfoId: string, manager: EntityManager): Promise<DeleteResult>{       
        try{
            return await manager.createQueryBuilder(HealthInfo, "health_info").softDelete().where("health_info_id = :healthInfoId",{healthInfoId}).execute();
        }catch(err){
            throw err;
        }
    }
}