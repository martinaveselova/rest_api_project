import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Item } from "./item";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  order_number!: string;

  @Column()
  orderCreated!: string;

  @Column()
  status!: string;

  @Column()
  carrier!: string;

  @Column()
  carrier_service!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  deliveryAddress!: string;

  @Column()
  deliveryPhone!: string;

  @Column()
  deliveryEmail!: string;

  @ManyToOne(() => Item, (item) => item.orders, { nullable: false })
  item!: Item;
}
