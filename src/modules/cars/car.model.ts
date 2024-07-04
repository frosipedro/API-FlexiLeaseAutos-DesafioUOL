import { Schema, model } from 'mongoose';

interface Acessory {
  description: string;
}

export interface ICar extends Document {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: Acessory[];
  number_of_passengers: number;
}

const acessorySchema = new Schema<Acessory>({
  description: { type: String, required: true },
});

const carSchema = new Schema<ICar>({
  model: { type: String, required: true },
  color: { type: String, required: true },
  year: { type: Number, required: true },
  value_per_day: { type: Number, required: true },
  accessories: [acessorySchema],
  number_of_passengers: { type: Number, required: true },
});

const Car = model<ICar>('Car', carSchema);

export default Car;
