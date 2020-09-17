import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cp_locations', { schema: 'cloud-printer' })
export class CpLocations {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('varchar', { name: 'printer_01', nullable: true, length: 100 })
  printer_01: string | null;

  @Column('varchar', { name: 'printer_02', nullable: true, length: 100 })
  printer_02: string | null;

  @Column('varchar', { name: 'printer_03', nullable: true, length: 100 })
  printer_03: string | null;

  @Column('varchar', { name: 'printer_04', nullable: true, length: 100 })
  printer_04: string | null;

  @Column('varchar', { name: 'printer_05', nullable: true, length: 100 })
  printer_05: string | null;
}
