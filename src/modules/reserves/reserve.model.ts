import { Schema, model, Types } from 'mongoose';

export interface IReserveUserCreate extends Document {
  id_user: Types.ObjectId | string;
  start_date: Date;
  end_date: Date;
  id_car: Types.ObjectId;
  [key: string]: any;
}

export interface IReserve extends Document {
  id_user: Types.ObjectId | string;
  start_date: Date;
  end_date: Date;
  id_car: Types.ObjectId;
  final_value: number;
  [key: string]: any;
}

const reserveSchema = new Schema<IReserve>({
  id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  id_car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  final_value: { type: Number, required: true },
});

reserveSchema.index(
  { id_car: 1, start_date: 1, end_date: 1 },
  { unique: true },
);

reserveSchema.index({ id_user: 1, start_date: 1, end_date: 1 });

reserveSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Reserve = model<IReserve>('Reserve', reserveSchema);

export default Reserve;
