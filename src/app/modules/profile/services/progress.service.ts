import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from '@infra/database/entities/profile/progress.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Class } from '@infra/database/entities/class/class.entity';
import { Section } from '@infra/database/entities/section/section.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private repository: Repository<Progress>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
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

  async save(profileId: number, progress: number, entityId: number) {
    const entityType = 'section';

    const sectionProgress = await this.repository
      .findOneByOrFail({
        entityId,
        profileId,
        entityType,
      })
      .catch(() =>
        this.repository.create({
          entityId,
          entityType,
          profileId,
          progress: 0,
        }),
      );
    sectionProgress.progress = progress;
    await this.repository.save(sectionProgress);

    return sectionProgress;
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
