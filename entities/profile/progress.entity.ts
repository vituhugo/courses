import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from '@infra/database/entities/profile/profile.entity';
import { Exclude, Expose } from 'class-transformer';

export class Progress {
  @PrimaryColumn()
  @Exclude()
  profileId: number;

  @PrimaryColumn()
  entityId: number;

  @PrimaryColumn()
  @Exclude()
  entityType: string;

  @Column({ type: 'float' })
  progress: number;

  @ManyToOne(() => Profile)
  profile: Profile;

  @Expose({ name: 'isFinished' })
  isFinished() {
    return this.progress >= 1;
  }
}
