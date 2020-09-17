import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('locationId_checklistId', ['locationId', 'checklistId'], {
  unique: true,
})
@Entity('cp_print', { schema: 'cloud-printer' })
export class CpPrint {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'location_id', nullable: true, unsigned: true })
  locationId: number | null;

  @Column('int', { name: 'checklist_id', nullable: true, unsigned: true })
  checklistId: number | null;

  @Column('int', {
    name: 'print_num',
    nullable: true,
    unsigned: true,
    default: () => '\'0\'',
  })
  printNum: number | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    unsigned: true,
    default: () => '\'0\'',
  })
  status: number | null;
}
