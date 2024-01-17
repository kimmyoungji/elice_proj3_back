import { DataSource, EntityManager, InsertResult, Timestamp, UpdateResult } from "typeorm";
import { User } from "./entities/user.entity";

export class UserRepository{

    // Create
    public async saveUser(user: User, manager: EntityManager): Promise<InsertResult>{
        try{
            const result =  await manager.createQueryBuilder(User, "user")
                            .insert()
                            .into(User,['userId','email','password','providerId','displayName'])
                            .values(user)
                            .execute(); 
            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
       
    }

    // Read
    public async findUserAll(manager: EntityManager): Promise<User[]>{
        return await manager.createQueryBuilder(User, "user")
                            .select()
                            .getMany();
    }

    public async findUserByEmail(email: string, manager: EntityManager): Promise<User>{
        return await manager.createQueryBuilder(User, "user")
                            .where("email = :email", {email})
                            .getOne();
    }

    public async findUserByUserId(userId: string, manager: EntityManager): Promise<User>{
        try{
            return await manager.createQueryBuilder(User, "user")
                                        .select()
                                        .where("user_id = :userId", {userId})
                                        .getOne();
        }catch(err){
            throw err;
        }
    }

    // Update
    public async updateUserByEmail(email: string, user: User, manager: EntityManager): Promise<UpdateResult>{
        return await manager.createQueryBuilder(User, "user")
                            .update(User)
                            .set(user)
                            .where("email = :email", {email})
                            .execute();
    }

    // soft Delete
    public async softDeleteUserByUserId(userId: string, manager: EntityManager): Promise<UpdateResult>{       
        const user = await manager.findOneBy(User, {userId});
        return await manager.createQueryBuilder(User, "user")
                            .softDelete()
                            .where("id = :id", {userId})
                            .execute();
    }

}