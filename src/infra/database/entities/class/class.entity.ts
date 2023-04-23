import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Module } from '../module/module.entity';
import { Section } from '../section/section.entity';
import { Expose, Transform } from 'class-transformer';
import { Progress } from '../profile/progress.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imgSrc: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => Module)
  module: Module;

  @OneToMany(() => Section, (section) => section.class)
  sections: Section[];

  @Expose({ name: 'progress' })
  @Transform(({ value, obj }: { value: Progress[], obj: Class }) => {
    if (value && value.length > 0) return value[0];
    const progress = new Progress();
    progress.entityId = obj.id;
    progress.entityType = 'class';
    return progress;
  })
  progresses: Progress[] | null;
}
