// import { Repository } from "typeorm";
// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { HealthInfo } from "../entities/health-info.entity";

// @Injectable()
// export class HealthInfoRepository extends Repository<HealthInfo> {
//     constructor(@InjectRepository(HealthInfo) private healthInfoRepository: Repository<HealthInfo>) {
//         super(healthInfoRepository.target, healthInfoRepository.manager, healthInfoRepository.queryRunner);
//     }
    
//     async createHealthInfo(healthInfo: HealthInfo): Promise<HealthInfo> {
//         const newHealthInfo = this.create(healthInfo);
//         return await this.save(newHealthInfo);
//     }
// }
