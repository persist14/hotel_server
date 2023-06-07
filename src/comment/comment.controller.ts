import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../guard/auth.guard';

@Controller('cmts')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async list(@Query() query: Record<string, any>): Promise<any> {
    // 根据条件查询评论
    const result = await this.commentService.List(query);
    const res = JSON.parse(JSON.stringify(result.data));
    // 再根据评论中的u_id查询头像昵称
    for (let i = 0; i < res.length; i++) {
      const item = res[i];
      const userInfo = await this.userService.profile(item.u_id);
      res[i]['userInfo'] = {
        username: userInfo && userInfo.username,
        avatar: userInfo && userInfo.avatar,
      };
    }
    return { ...result, data: res };
  }

  @UseGuards(AuthGuard)
  @Post('add')
  async add(
    @Body() body: Record<string, any>,
    @Request() req: Request,
  ): Promise<any> {
    const userRst = req['user'];
    body.u_id = userRst.id;
    const result = await this.commentService.Create(body);
    return '';
  }
}
