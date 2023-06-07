import { Inject, Injectable } from '@nestjs/common';
import { Comment } from '@app/db/schema/comment';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@Injectable()
export class CommentService {
  async;

  constructor(
    @Inject(Comment.name)
    private readonly cmtDB: ReturnModelType<typeof Comment>,
  ) {}

  async Create(data) {
    try {
      const { u_id, r_id } = data;
      if (u_id) {
        data.u_id = new Types.ObjectId(u_id);
      }
      if (r_id) {
        data.r_id = new Types.ObjectId(u_id);
      }
      const result = await this.cmtDB.create(data);
      return { code: 200, data: '', msg: '' };
    } catch (ex) {
      console.log('插入错误', ex);
    }
  }

  async List(data) {
    try {
      const { page, pageSize } = data;
      const result = await this.cmtDB.find(
        {
          r_id: data.r_id,
        },
        { __v: 0, _id: 0, r_id: 0 },
        { $skip: (page - 1) * pageSize, $limit: pageSize },
      );
      const total = await this.cmtDB.countDocuments();
      return { code: 200, data: result, total, msg: '' };
    } catch (ex) {
      console.log('查询错误', ex);
    }
  }
}
