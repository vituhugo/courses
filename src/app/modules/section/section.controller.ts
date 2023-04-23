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
      throw new HttpException('Class part not found', 404);
    });
  }

  @Get(':id/video')
  async getVideo(
    @Param('id') id: string,
    @Response() response: ExpressResponse,
  ) {
    const video = await this.classPartService.getVideo(+id);
    response
      .status(200)
      .header('Content-Type', video.mimeType)
      .header('Content-Length', video.size.toString())
      .header('Cache-Control', 'no-cache')
      .header('Connection', 'keep-alive')
      .header('Pragma', 'no-cache')
      .header('Expires', '0');

    await new Promise((resolve, reject) => {
      https.get(video.path, (stream) => {
        stream.on('error', (error) => {
          reject(error);
        });
        stream.on('close', () => {
          response.end();
          resolve(response);
        });
        stream.pipe(response);
      });
    });

    return response;
  }

  @Get(':id/video/thumbnail')
  async getVideoThumbnail(
    @Param('id') id: string,
    @Response() response: ExpressResponse,
  ) {
    const video = await this.classPartService.getVideo(+id);
    return response.sendFile(video.thumbnailPath);
  }
}
