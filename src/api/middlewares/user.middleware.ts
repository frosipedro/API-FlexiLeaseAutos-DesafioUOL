import User from '../models/user.model';
import { IUser } from '../models/user.model';
import axios from 'axios';
import { validateCPF } from '../utils/validateCPF';
import { validateEmail } from '../utils/validateEmail';

export class UserMiddleware {
  public async formatCEP(body: IUser): Promise<IUser> {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${body.cep}/json/`,
      );
      const { logradouro, complemento, bairro, localidade, uf } = response.data;

      const dataFormated: IUser = {
        ...body,
        patio: logradouro,
        complement: complemento,
        neighborhood: bairro,
        locality: localidade,
        uf: uf,
      };

      return dataFormated;
    } catch (error) {
      return error;
    }
  }

  public async createUser(body: IUser) {
    try {
      const {
        name,
        cpf,
        birth,
        email,
        password,
        cep,
        qualified,
        patio,
        complement,
        neighborhood,
        locality,
        uf,
      } = body;
      if (
        !name ||
        !cpf ||
        !birth ||
        !email ||
        !password ||
        !cep ||
        !qualified ||
        !patio ||
        !complement ||
        !neighborhood ||
        !locality ||
        !uf
      ) {
        return 'Missing required fields';
      }

      const currentDate = new Date();
      const userBirthdate = new Date(birth);
      const userAge = Math.floor(
        (currentDate.getTime() - userBirthdate.getTime()) /
          (1000 * 60 * 60 * 24 * 365),
      );
      if (userAge < 18) {
        return 'User must be at least 18 years old';
      }

      if (!validateCPF(cpf)) {
        return 'Invalid CPF';
      }
      const existingCPF = await User.findOne({ cpf });
      if (existingCPF) {
        return 'CPF already exists';
      }

      if (!validateEmail(email)) {
        return 'Invalid email';
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return 'Email already exists';
      }

      if (password.length < 6) {
        return 'Password must have at least 6 characters';
      }
    } catch (error) {
      return error;
    }
  }
}
