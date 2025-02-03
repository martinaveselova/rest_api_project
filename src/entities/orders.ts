import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { OrderItem } from './orderItem'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 20, unique: true })
  orderNumber: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderCreated: Date

  @Column({ type: 'varchar', length: 40, nullable: false })
  carrier: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  carrierService: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  lastName: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  deliveryStreet: string

  @Column({ type: 'varchar', length: 10, nullable: false })
  deliveryZipCode: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  deliveryCity: string

  @Column({ type: 'varchar', length: 20, nullable: false })
  deliveryPhone: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  deliveryEmail: string

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[]
}
