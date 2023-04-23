import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { addProgressRelationship } from '../../../helpers/add-progress-relationship';
import { Module } from '@infra/database/entities/module/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly repository: Repository<Module>,
  ) {}

  findAll(
    filters: Record<string, string> = {},
    relations: string[],
    profileId?: number,
  ) {
    return this.repository.find(
      addProgressRelationship(profileId, 'module', {
        where: filters,
        relations: relations,
      }),
    );
  }

  async findOne(id: number, relations = [], profileId?: number) {
    return this.repository.findOneOrFail(
      addProgressRelationship(profileId, 'module', {
        where: { id },
        relations: relations,
      }),
    );
  }
}
