import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FoodInfoNara extends BaseEntity {
  @PrimaryColumn()
  food_info_id: string;

  @Column()
  food_name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  total_capacity: number;

  @Column({ nullable: true })
  total_capacity_unit: string;

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  carbohydrates: number;

  @Column({ nullable: true })
  proteins: number;

  @Column({ nullable: true })
  fats: number;

  @Column({ nullable: true })
  research_year: string;
}
