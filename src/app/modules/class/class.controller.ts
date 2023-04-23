import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  findAll(@Query('filters') filters: Record<string, string> = {}) {
    return this.classService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }
}
