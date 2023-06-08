import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/:cate')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file, @Param() params: Record<string, string>) {
    // 整理路径
    const picPath = file.path.split('public').pop().replace(/\\/g, '/');
    const prefix = this.configService.get<string>('PREFIX');
    return { code: 200, data: { picPath: prefix + picPath }, msg: '' };
  }
}
