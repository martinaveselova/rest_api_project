import { Unique, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Order } from './orders'

@Entity()
@Unique(['name'])
@Unique(['ean'])
@Unique(['sku'])
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ type: 'varchar', length: 13, nullable: false })
  ean!: string

  @Column({ type: 'varchar', length: 8, nullable: false })
  sku!: string

  @ManyToMany(() => Order, (order) => order.items)
  orders!: Order[]
}
