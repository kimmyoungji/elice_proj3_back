import { HealthInfo } from "src/user/entities/health-info.entity";
import {
  DeleteResult,
  EntityManager,
  InsertResult
} from "typeorm";

export class HealthInfoRepository {
  // Create
  public async saveHealthInfo(
    healthInfo: HealthInfo,
    manager: EntityManager
  ): Promise<InsertResult> {
    try {
      return await manager
        .createQueryBuilder(HealthInfo, "health_info")
        .insert()
        .into(HealthInfo)
        .values(healthInfo)
        .execute();
    } catch (err) {
      throw err;
    }
  }

  // Read
  public async findRecentHealthInfoById(
    healthInfoId: string,
    manager: EntityManager
  ): Promise<HealthInfo> {
    try {
      return await manager
        .createQueryBuilder(HealthInfo, "health_info")
        .where("health_info_id = :healthInfoId", { healthInfoId })
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  public async findRecentHealthInfoByUserId(
    userId: string,
    manager: EntityManager
  ): Promise<HealthInfo> {
    try {
      return await manager
        .createQueryBuilder(HealthInfo, "health_info")
        .where("user_id = :userId", { userId })
        .orderBy("updated_date", "DESC")
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  public async findHealthInfoByUserId(
    date: Date,
    userId: string,
    manager: EntityManager
  ): Promise<HealthInfo> {
    try {
      return await manager
        .createQueryBuilder(HealthInfo, "health_info")
        .where("user_id = :userId", { userId })
        .andWhere("updated_date <= :date", { date })
        .orderBy("updated_date", "DESC")
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  // Delete
  public async deleteHealthInfoById(
    userId: string,
    manager: EntityManager
  ): Promise<DeleteResult> {
    try {
      return await manager
        .createQueryBuilder(HealthInfo, "health_info")
        .softDelete()
        .where("user_id = :userId", { userId })
        .execute();
    } catch (err) {
      throw err;
    }
  }
}
