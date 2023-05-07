import {
  Controller,
  Response,
  Get,
  Param,
  Query,
  Request,
  HttpException,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Response as ExpressResponse } from 'express';
import * as https from 'node:https';

@Controller('section')
export class SectionController {
  constructor(private readonly classPartService: SectionService) {}

  @Get()
  findAll(
    @Query('filters') filters: Record<string, string> = {},
    @Query('relations') relations: string[] = [],
    @Request() { user },
  ) {
    return this.classPartService.findAll(filters, relations, user?.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() { user }) {
    return this.classPartService.findOne(+id, user?.sub).catch(() => {
      throw new HttpException('Section not found', 404);
    });
  }

  @Get(':id/video')
  async getVideo(@Param('id') id: string) {
    return this.classPartService.getVideo(+id);
  }
}
