import AppError from '../../utils/AppError';
import Reserve from './reserve.model';
import { IReserve } from './reserve.model';

interface PaginatedReserves {
  reserves: IReserve[];
  totalReserves: number;
  page: number;
  limit: number;
  offset: number;
  offsets: number;
}

export class ReserveService {
  public async createReserve(reserveParams: IReserve): Promise<IReserve> {
    try {
      const reserve = new Reserve(reserveParams);
      await reserve.save();
      return reserve;
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getReserves(
    query: any,
    page?: number,
    limit?: number,
  ): Promise<PaginatedReserves> {
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

      const reserves = await Reserve.find(searchCriteria)
        .skip(skip)
        .limit(limitNumber);
      const totalReserves = await Reserve.countDocuments(searchCriteria);
      const offsets = Math.ceil(totalReserves / limitNumber);

      return {
        reserves,
        totalReserves,
        page: pageNumber,
        limit: limitNumber,
        offset: skip,
        offsets,
      };
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getReserveById(id: string): Promise<any> {
    try {
      const reserve = await Reserve.findById(id);
      return reserve;
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async deleteReserve(id: string): Promise<void> {
    try {
      await Reserve.findByIdAndDelete(id);
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }
}
