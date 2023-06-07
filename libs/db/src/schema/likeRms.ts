import { Prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class LikeRms {
  @Prop({ required: true, type: Types.ObjectId })
  u_id: string;
  @Prop({ required: true, type: Types.ObjectId })
  r_id: string;
  @Prop()
  like: boolean;
}
