// @ts-ignore

import { Prop } from '@typegoose/typegoose';

export class Hotel {
  @Prop({ required: true })
  hotel_name: string; // 名称
  @Prop()
  longitude: string; // 经度
  @Prop()
  latitude: string; // 维度
  @Prop()
  address: string; // 地址
  @Prop()
  rate: number; // 评分
  @Prop()
  ave_price: number; // 均价
  @Prop()
  cover: string; // 封面
}
