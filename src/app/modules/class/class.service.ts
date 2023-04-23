import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '@infra/database/entities/class/class.entity';
import { addProgressRelationship } from '../../../helpers/add-progress-relationship';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly repository: Repository<Class>,
  ) {}

  findAll(filters = {}, relations: string[] = [], profileId?: number) {
    return this.repository.find(
      addProgressRelationship(profileId, 'class', {
        where: filters,
        relations: relations,
      }),
    );
  }

  findOne(id: number, relations: string[] = [], profileId?: number) {
    return this.repository.findOne(
      addProgressRelationship(profileId, 'class', {
        where: { id },
        relations: relations,
      }),
    );
  }
}
