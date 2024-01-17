import { DataSource, EntityManager, InsertResult, Timestamp, UpdateResult } from "typeorm";
import { User } from "./entities/user.entity";

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

    public async findUserByUserId(userId: string, manager: EntityManager): Promise<User>{
        try{
            return await manager.createQueryBuilder(User, "user").select().where("user_id = :userId",{userId}).getOne();
        }catch(err){
            throw err;
        }
    }

    // Update
    public async updateUserByEmail(email: string, user: User, manager: EntityManager): Promise<UpdateResult>{
        try{
            return await manager.createQueryBuilder(User, "user").update(User).set(user).where("email = :email",{email}).execute();
        }catch(err){
            throw err;
        }
    }

    // soft Delete
    public async softDeleteUserByUserId(userId: string, manager: EntityManager): Promise<UpdateResult>{       
        try{
            return await manager.createQueryBuilder(User, "user").softDelete().where("user_id = :userId",{userId}).execute();
        }catch(err){
            throw err;
        }
    }

}