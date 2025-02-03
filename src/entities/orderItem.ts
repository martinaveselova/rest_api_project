import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Order } from './orders'
import { Product } from './products'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order

  @ManyToOne(() => Product, (product) => product.orderItems, { onDelete: 'CASCADE' })
  product: Product

  @Column({ type: 'int', nullable: false })
  quantity: number
}
