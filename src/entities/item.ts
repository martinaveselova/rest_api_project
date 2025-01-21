import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./orders";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "varchar", length: 13, nullable: false })
  ean!: string;

  @Column({ type: "varchar", length: 8, nullable: false })
  sku!: string;

  @OneToMany(() => Order, (order) => order.item)
  orders!: Order[];
}
