import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @Column()
  lot!: number;
}
