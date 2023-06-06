import { Prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class Comment {
  @Prop({ required: true })
  u_id: Schema.Types.ObjectId;
  @Prop({ required: true })
  r_id: Schema.Types.ObjectId;
  @Prop({ text: true })
  content: string;
  @Prop()
  rate: number;
}
