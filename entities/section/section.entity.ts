import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Video } from './video.entity';
import { Expose, Transform } from "class-transformer";
import {Class} from '../class/class.entity'
import {Progress} from '../profile/progress.entity'

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Class)
  class: Class;

  @Column()
  classId: number;

  @OneToOne(() => Video)
  Video: Video;

  @Expose({ name: 'progress' })
  @Transform(({ value, obj }: { value: Progress[], obj: Section }) => {
    if (value && value.length > 0) return value[0];
    const progress = new Progress();
    progress.entityId = obj.id;
    progress.entityType = 'section';
    return progress;
  })
  progresses: Progress[] | null;
}
