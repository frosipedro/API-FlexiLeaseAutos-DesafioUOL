import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  cep: string;
  qualified: string;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cep: { type: String, required: true },
  qualified: { type: String, required: true },
  patio: { type: String, required: true },
  complement: { type: String, required: true },
  neighborhood: { type: String, required: true },
  locality: { type: String, required: true },
  uf: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;
