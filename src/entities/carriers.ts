import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { CarrierService } from './carrierService'

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @ManyToOne(() => CarrierService, (carrierService) => carrierService.carrier, { nullable: false })
  carrierService!: CarrierService
}
