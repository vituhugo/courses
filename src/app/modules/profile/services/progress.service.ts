import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from '@infra/database/entities/profile/progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private repository: Repository<Progress>,
  ) {}

  findAll(profileId: number, entityType: string) {
    return this.repository.find({
      where: { profileId, entityType },
    });
  }

  findOne(sub, entityType: string, entityId: number) {
    return this.repository.findOne({
      where: { profileId: sub, entityType, entityId },
    });
  }

  save(
    profileId: number,
    entityType: string,
    progress: number,
    entityId: number,
  ) {
    return this.repository.save(
      {
        progress,
        entityType,
        profileId,
        entityId,
      },
      { reload: true },
    );
  }
}
