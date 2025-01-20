import { Unique, ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Item } from './items'

@Entity()
@Unique(['orderNumber'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  orderNumber!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderCreated!: Date

  @Column()
  carrier!: string

  @Column()
  carrierService!: string

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  deliveryAddress!: string

  @Column()
  deliveryPhone!: string

  @Column()
  deliveryEmail!: string

  @ManyToMany(() => Item, (item) => item.orders)
  @JoinTable()
  items!: Item[]
}
