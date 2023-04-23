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
    return this.repository.findOneOrFail({
      where: { profileId: sub, entityType, entityId },
    });
  }

  async save(
    profileId: number,
    entityType: string,
    progress: number,
    entityId: number,
  ) {
    await this.insertOrUpdate(profileId, entityType, progress, entityId);
    return this.repository.findOneByOrFail({ entityType, entityId, profileId });
  }

  private async insertOrUpdate(
    profileId: number,
    entityType: string,
    progress: number,
    entityId: number,
  ) {
    const exists = await this.repository.exist({
      where: { entityType, entityId, profileId },
    });

    if (exists) {
      return this.repository.update(
        { entityType, entityId, profileId },
        { progress },
      );
    }

    return this.repository.insert({
      progress,
      entityType,
      profileId,
      entityId,
    });
  }
}
