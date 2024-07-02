import { Schema, model, Types } from 'mongoose';

export interface IReserve {
  id_user: Types.ObjectId | string;
  start_date: Date;
  end_date: Date;
  id_car: Types.ObjectId;
  final_value: number;
}

const reserveSchema = new Schema<IReserve>({
  id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  id_car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  final_value: { type: Number, required: true },
});

const Reserve = model<IReserve>('Reserve', reserveSchema);

export default Reserve;
