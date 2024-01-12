import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FoodInfoPortal extends BaseEntity {
  @PrimaryColumn()
  food_info_id: string;

  @Column()
  food_name: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  main_code: string;

  @Column({ nullable: true })
  main_food_name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  standard_capacity: number;

  @Column({ nullable: true })
  total_capacity: number;

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  carbohydrates: number;

  @Column({ nullable: true })
  proteins: number;

  @Column({ nullable: true })
  fats: number;

  @Column({ nullable: true })
  dietary_fiber: number;

  @Column({ nullable: true })
  created_date: Date;

  @Column({ nullable: true })
  updated_date: Date;
}
