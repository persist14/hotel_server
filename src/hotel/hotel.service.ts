import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from '@app/db/schema/hotel';
import { ReturnModelType } from '@typegoose/typegoose';
import {Room} from "@app/db/schema/rooms";
import { Types, PipelineStage } from "mongoose";
import moment from "moment";

interface listWheOpts {
  hotel_name?: {}
}
@Injectable()
export class HotelService {
  constructor(
    @Inject(Hotel.name) private readonly htDB: ReturnModelType<typeof Hotel>,
    @Inject(Room.name) private  readonly rmDB: ReturnModelType<typeof Room>
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
    let where: listWheOpts = {};
    if (data.keyword) {
      where.hotel_name = {
        '$regex': data.keyword
      };
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
  async SearchHt(data) {
    const {liv_start_time, liv_end_time} = data
    // 先查room 再将room表中的h_id查出来并去重 再去查hotel表
    if(liv_start_time && liv_end_time) {
      data.liv_start_time = new Date(liv_start_time)
      data.liv_end_time = new Date(liv_end_time)
    }
    console.log(data)
    const result = await this.rmDB.aggregate([
      {
        '$match': {
          liv_start_time: {
            '$gte': data.liv_start_time,
          },
          liv_end_time: {
            '$lte': data.liv_end_time
          },
          living: false,
          residents: {
            '$gte': Number(data.residents)
          },
        },

      },
      {
        '$group': {
          _id: "$h_id"
        }
      }
    ])
    console.log(result)
  }
  async detail(id) {
    const result = await this.htDB.findById(id, { __v: 0 });
    return { code: 200, data: result, msg: '' };
  }
  // 新增房间
  async roomCreate(data) {
    try {
      const { liv_start_time, liv_end_time } = data
      // 格式化时间
      if(liv_start_time && liv_end_time) {
        data.liv_start_time = new Date(liv_start_time)
        data.liv_end_time = new Date(liv_end_time)
      }

      data = { ...data, h_id: new Types.ObjectId(data.h_id), cmt_id: new Types.ObjectId(data.h_id) }
      await this.rmDB.create(data)
      return { code: 200, data: '', msg: '' }
    } catch (ex) {
      console.log('插入错误', ex)
    }

    return { code: 200, data: '', msg: '' }
  }
}
