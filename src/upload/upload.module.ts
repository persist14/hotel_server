import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

const MulterOpts = [
  MulterModule.registerAsync({
    useFactory: () => {
      return {
        storage: diskStorage({
          destination: (req, file, cb) => {
            let picPath = `${process.cwd()}/public`;
            const { cate } = req.params;
            // 自定义上传路径
            if (cate) {
              picPath = `${picPath}/${cate}`;
            }
            // 判断当前文件夹存在吗 不存在 新建文件夹
            if (!fs.existsSync(picPath)) {
              fs.mkdirSync(picPath, { recursive: true });
            }
            return cb(null, picPath);
          },
          // 定义文件名称
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-';
            return cb(null, file.originalname);
          },
        }),
      };
    },
  }),
];

@Module({
  imports: MulterOpts,
  controllers: [UploadController],
  providers: [UploadService],
  exports: MulterOpts,
})
export class UploadModule {}
