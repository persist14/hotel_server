import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
