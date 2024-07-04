import AppError from '../../utils/AppError';
import User from '../users/user.model';
import { IUser } from '../users/user.model';

interface PaginatedUsers {
  users: IUser[];
  totalUsers: number;
  page: number;
  limit: number;
  offset: number;
  offsets: number;
}

export class UserService {
  public async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getUsers(
    query: any,
    page?: number,
    limit?: number,
  ): Promise<PaginatedUsers> {
    try {
      const pageNumber = page ? page : 1;
      const limitNumber = limit ? limit : 10;
      const skip = (pageNumber - 1) * limitNumber;

      const searchCriteria: { [key: string]: any } = {};
      for (const key in query) {
        if (query[key]) {
          searchCriteria[key] = { $regex: query[key], $options: 'i' };
        }
      }

      const users = await User.find(searchCriteria)
        .skip(skip)
        .limit(limitNumber);
      const totalUsers = await User.countDocuments(searchCriteria);
      const offsets = Math.ceil(totalUsers / limitNumber);

      return {
        users,
        totalUsers,
        page: pageNumber,
        limit: limitNumber,
        offset: skip,
        offsets,
      };
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await User.findByIdAndDelete(id);
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async updateUser(id: string, userData: IUser): Promise<IUser> {
    try {
      const user = await User.findByIdAndUpdate(id, userData, { new: true });
      return user;
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getUserById(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }
}
