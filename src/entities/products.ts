import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { OrderItem } from './orderItem'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  name: string

  @Column({ type: 'varchar', unique: true, length: 13, nullable: false })
  ean: string

  @Column({ type: 'varchar', unique: true, length: 8, nullable: false })
  sku: string

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[]
}
