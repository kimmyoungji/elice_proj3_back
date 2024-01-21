import { Between, DataSource, Repository } from "typeorm";
import { CumulativeRecord } from "./cumulative-record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CumulativeRecordRepository extends Repository<CumulativeRecord> {
  constructor(
    @InjectRepository(CumulativeRecord) private dataSource: DataSource
  ) {
    super(CumulativeRecord, dataSource.manager);
  }

  // 데이터 추가 api - test용
  // async addData(): Promise<CumulativeRecord> {
  //   const data = this.create({
  //     user_id: "02",
  //     daily_total_calories: 600,
  //     date: new Date(),
  //   });
  //   await this.save(data);
  //   return data;
  // }

  async getDateRecord(date: Date, userId: string): Promise<CumulativeRecord[]> {
    console.log(date);
    const result = await this.createQueryBuilder("entity")
      .where(`DATE_TRUNC('day', entity.date) = :date`, { date })
      .andWhere(`entity.user_id = :userId`, { userId })
      .getMany();
    console.log(result);
    return result;
    // return this.findBy({ date, user_id: userId });
  }

  async getMonthRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecord[]> {
    const datetime = new Date(date);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    console.log("year", year, month);
    const result = await this.createQueryBuilder("entity")
      .where("entity.user_id = :userId", { userId })
      .andWhere("EXTRACT(YEAR FROM entity.date) = :year", { year })
      .andWhere("EXTRACT(MONTH FROM entity.date) = :month", { month })
      .getMany();
    console.log(result);
    return result;
  }
}
