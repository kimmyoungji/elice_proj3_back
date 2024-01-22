import { DataSource, Equal, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { SplitImage } from "./splitImage.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";


@Injectable()
export class SplitImageRepository extends Repository<SplitImage> {
   
}