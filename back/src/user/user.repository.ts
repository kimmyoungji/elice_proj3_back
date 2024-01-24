import { EntityManager, InsertResult } from "typeorm";
import { User } from "./entities/user.entity";
import { HealthInfo } from "./entities/health-info.entity";

export class UserRepository{

    // Create
    public async saveUser(user: User, manager: EntityManager): Promise<InsertResult>{
        try{
            return await manager.createQueryBuilder(User, "user").insert()
                                .into(User,['userId','email','password','providerId','username']).values(user).execute(); 
        }catch(err){
            throw err;
        }
       
    }

    // Read
    public async findUserByEmail(email: string, manager: EntityManager): Promise<User>{
        try{
            return await manager.createQueryBuilder(User, "user").where("email = :email", {email}).getOne();
        }catch(err){
            throw err;
        }
    }

    public async findUserInfosByUserId(userId: string, manager: EntityManager){
        try{
            return await manager.query('SELECT * FROM "user" AS u LEFT JOIN health_info as h ON u.user_id = h.user_id WHERE u.user_id = $1 ORDER BY h.updated_date DESC limit 1;', [userId]);
        }catch(err){
            throw err;
        }
    }

    public async findUserByUserId(userId: string, manager: EntityManager): Promise<User>{
        try{
            return await manager.createQueryBuilder(User, "user").select().where("user_id = :userId",{userId}).getOne();
        }catch(err){
            throw err;
        }
    }

    // Update
    public async updateUserByUserId(userId: string, user: User, manager: EntityManager){
        try{
            console.log("업데이트 될것", user);
            return await manager.createQueryBuilder(User, "user").update(User).set(user).where("user_id = :userId",{userId}).execute();
        }catch(err){
            throw err;
        }
    }

    public async updateRecentHealthInfoIdByUserId(userId: string, recentHealthInfoId: string, manager: EntityManager){
        try{
            return await manager.createQueryBuilder(User, "user").update(User).set({recentHealthInfoId}).where("user_id = :userId",{userId}).execute();
        }catch(err){
            throw err;
        }
    }

    // soft Delete
    public async softDeleteUserByUserId(userId: string, manager: EntityManager){       
        try{
            console.log(userId);
            return await manager.createQueryBuilder(User, "user").softDelete().where("user_id = :userId",{userId}).execute();
        }catch(err){
            throw err;
        }
    }

}