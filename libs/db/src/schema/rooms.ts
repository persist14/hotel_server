import { Prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class Room {
  @Prop({ required: true })
  h_id: Schema.Types.ObjectId; // 酒店id
  @Prop()
  cmt_id: Schema.Types.ObjectId; // 评论id
  @Prop()
  cover: string; // 封面图
  @Prop()
  level: number; // 房间等级
  @Prop()
  residents: number; // 房间人数
  @Prop()
  price: number; // 房间价格
  @Prop({ text: true })
  intro: string; // 房间介绍
  @Prop()
  img_arr: ['string']; // 房间图片
  @Prop()
  rate: object // 评分信息
  @Prop()
  living: boolean // 是否居住
  @Prop()
  liv_start_time: Schema.Types.Date // 居住开始时间
  @Prop()
  liv_end_time: Schema.Types.Date // 居住结束时间
}
