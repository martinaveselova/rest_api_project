import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Product } from './products'

@Entity()
export class ProductStock {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Product, (product) => product.stock, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product

  @Column({ type: 'int', nullable: false })
  quantity: number
}
