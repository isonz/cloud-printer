import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cp_checklist', { schema: 'cloud-printer' })
export class CpChecklist {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', nullable: true, unsigned: true })
  userId: number | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('tinyint', {
    name: 'print_num',
    nullable: true,
    unsigned: true,
    default: () => 0,
  })
  printNum: number | null;
}
