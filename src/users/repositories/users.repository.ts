import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
    
    async createUser(user: User): Promise<User> {
        const newUser = this.create(user);
        return await this.save(newUser);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.findOneBy({ email });
    }
}
