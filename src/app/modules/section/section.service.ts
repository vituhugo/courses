import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '@infra/database/entities/section/section.entity';
import { Video } from '@infra/database/entities/section/video.entity';
import { addProgressRelationship } from '../../../helpers/add-progress-relationship';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly repository: Repository<Section>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  findAll(
    filters: Record<string, string> = {},
    relations: string[],
    profileId?: number,
  ) {
    return this.repository.find(
      addProgressRelationship(profileId, 'section', {
        where: filters,
        relations,
      }),
    );
  }

  findOne(id: number, profileId?: number) {
    return this.repository.findOneOrFail(
      addProgressRelationship(profileId, 'section', {
        where: { id },
      }),
    );
  }

  async getVideo(id: number) {
    return this.videoRepository.findOneByOrFail({ id });
  }
}
