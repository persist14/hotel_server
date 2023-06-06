import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from '@app/db/schema/hotel';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class HotelService {
  constructor(
    @Inject(Hotel.name) private readonly htDB: ReturnModelType<typeof Hotel>,
  ) {}
  async Create(data) {
    try {
      const result = await this.htDB.create(data);
    } catch (ex) {
      console.log('插入失败', ex);
    }
    return { code: 200, data: '' };
  }
  async List(data) {
    const { page = 1, pageSize = 10 } = data;
    const where = {};
    if (data.keyword) {
      where['$regex'] = data.keyword;
    }
    try {
      const result = await this.htDB.find(
        where,
        {},
        {
          skip: (page - 1) * pageSize,
          limit: pageSize,
        },
      );
      return { code: 200, data: result, msg: '' };
    } catch (ex) {
      console.log('查询失败', ex);
    }
  }
  async detail(id) {
    const result = await this.htDB.findById(id, { __v: 0 });

    return { code: 200, data: result, msg: '' };
  }
}
