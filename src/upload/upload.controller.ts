import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as process from 'process';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'public'),
        filename: (req, file, cb) => {
          console.log(file, '>>>>');
          const uniqueSuffix = Date.now() + '-';
          cb(null, `${uniqueSuffix}${file.originalname}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file) {
    console.log(file);
    return true;
  }
}
