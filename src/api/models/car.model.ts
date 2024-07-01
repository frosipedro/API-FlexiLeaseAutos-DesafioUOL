import { Schema, model } from 'mongoose';

export interface ICar {
  model: string;
  color: string;
  year: number;
  value_per_day: number;
  accessories: [{ description: string }];
  number_of_passengers: number;
}

const carSchema = new Schema<ICar>({
  model: { type: String, required: true },
  color: { type: String, required: true },
  year: { type: Number, required: true },
  value_per_day: { type: Number, required: true },
  accessories: [{ description: { type: String, required: true } }],
  number_of_passengers: { type: Number, required: true },
});

const Car = model<ICar>('Car', carSchema);

export default Car;
