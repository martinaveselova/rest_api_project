import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Carrier } from './carriers'

@Entity()
export class CarrierService {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @OneToMany(() => Carrier, (carrier) => carrier.carrierService)
  carrier!: Carrier[]
}
