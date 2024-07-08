import AppError from '../../utils/AppError';
import axios from 'axios';
import User from '../users/user.model';
import { IUser } from '../users/user.model';
import { validateCPF } from '../../utils/validateCPF';
import { validateEmail } from '../../utils/validateEmail';

interface IUserBeforeFormatedCEP extends Document {
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password: string;
  cep: string;
  qualified: string;
}

export class UserMiddleware {
  public async formatCEP(userData: IUserBeforeFormatedCEP): Promise<IUser> {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${userData.cep}/json/`,
      );
      const { logradouro, complemento, bairro, localidade, uf } = response.data;

      const dataFormated: Partial<IUser> = {
        ...userData,
        patio: logradouro || 'N/A',
        complement: complemento || 'N/A',
        neighborhood: bairro || 'N/A',
        locality: localidade || 'N/A',
        uf: uf || 'N/A',
      };

      const dataFormatedIUser = new User(dataFormated as IUser);

      return dataFormatedIUser;
    } catch (error: any) {
      throw new AppError(400, 'Invalid CEP');
    }
  }

  public async createUser(userData: IUser): Promise<any> {
    try {
      const requiredFields = [
        'name',
        'cpf',
        'birth',
        'email',
        'password',
        'cep',
        'qualified',
        'patio',
        'complement',
        'neighborhood',
        'locality',
        'uf',
      ];
      for (const field of requiredFields) {
        if (!userData[field]) {
          throw new AppError(400, `Field '${field}' is required`);
        }
      }

      const currentDate = new Date();
      const userAge = Math.floor(
        (currentDate.getTime() - userData.birth.getTime()) /
          (1000 * 60 * 60 * 24 * 365),
      );
      if (userAge < 18) {
        throw new AppError(400, 'User must be at least 18 years old');
      }

      const cpf = userData.cpf;
      if (validateCPF(cpf) === false) {
        throw new AppError(400, 'Invalid CPF');
      }
      const existingCPF = await User.findOne({ cpf: userData.cpf });
      if (existingCPF) {
        throw new AppError(400, 'CPF already exists');
      }

      if (!validateEmail(userData.email)) {
        throw new AppError(400, 'Invalid email');
      }
      const searchEmail = userData.email;
      const existingEmail = await User.findOne({ searchEmail });
      if (existingEmail) {
        throw new AppError(400, 'Email already exists');
      }

      if (userData.password.length < 6) {
        throw new AppError(400, 'Password must have at least 6 characters');
      }
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async deleteUser(id: string): Promise<any> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new AppError(404, 'User not found');
      }
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async updateUser(id: any, userData: IUser): Promise<any> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      const requiredFields = [
        'name',
        'cpf',
        'birth',
        'email',
        'password',
        'cep',
        'qualified',
        'patio',
        'complement',
        'neighborhood',
        'locality',
        'uf',
      ];
      for (const field of requiredFields) {
        if (!userData[field]) {
          throw new AppError(400, `${field} is required`);
        }
      }

      const currentDate = new Date();
      const userBirthdate = new Date(userData.birth);
      const userAge = Math.floor(
        (currentDate.getTime() - userBirthdate.getTime()) /
          (1000 * 60 * 60 * 24 * 365),
      );
      if (userAge < 18) {
        throw new AppError(400, 'User must be at least 18 years old');
      }

      if (!validateCPF(userData.cpf)) {
        throw new AppError(400, 'Invalid CPF');
      }
      const searchCPF = userData.cpf;
      const existingCPF = await User.findOne({ searchCPF });
      if (existingCPF) {
        throw new AppError(400, 'CPF already exists');
      }

      if (!validateEmail(userData.email)) {
        throw new AppError(400, 'Invalid email');
      }
      const searchEmail = userData.email;
      const existingEmail = await User.findOne({ searchEmail });
      if (existingEmail) {
        throw new AppError(400, 'Email already exists');
      }

      if (userData.password.length < 6) {
        throw new AppError(400, 'Password must have at least 6 characters');
      }
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getUserById(id: string): Promise<any> {
    try {
      const findById = await User.findById(id);
      if (!findById) {
        throw new AppError(404, 'User not found');
      }
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }
}
