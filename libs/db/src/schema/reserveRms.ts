import { Prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class ReserveRms {
  @Prop({ required: true, type: Types.ObjectId })
  u_id: string;
  @Prop({ required: true, type: Types.ObjectId })
  h_id: string;
  @Prop({ required: true, type: Types.Array })
  residents: [string];
}
