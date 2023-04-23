import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  findAll(
    @Request() { user },
    @Query('filters') filters = {},
    @Query('relations') relations: string[] = [],
  ) {
    return this.moduleService.findAll(filters, relations, user?.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.moduleService.findOne(+id, user?.sub).catch(() => {
      throw new HttpException('Module not found', 404);
    });
  }
}
