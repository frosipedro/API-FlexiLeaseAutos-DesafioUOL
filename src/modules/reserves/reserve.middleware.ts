import AppError from '../../utils/AppError';
import { ICar } from '../cars/car.model';
import Reserve from '../reserves/reserve.model';
import { IReserveUserCreate } from '../reserves/reserve.model';
import { IUser } from '../users/user.model';

export class ReserveMiddleware {
  public async createReserve(
    reserveData: any,
    carData: any,
    userData: any,
  ): Promise<any> {
    if (!userData.qualified) {
      throw new AppError(
        400,
        'O usuário deve possuir uma carteira de motorista.',
      );
    }

    const { id_car, id_user, start_date, end_date } = reserveData;
    const overllapingCarReserves = await Reserve.find({
      id_car: id_car,
      $or: [
        { start_date: { $lte: start_date }, end_date: { $gte: start_date } },
        { start_date: { $lte: end_date }, end_date: { $gte: end_date } },
      ],
    });
    if (overllapingCarReserves.length > 0) {
      throw new AppError(
        400,
        'Já existe uma reserva para o carro no mesmo período.',
      );
    }

    const overlappingUserReservations = await Reserve.find({
      id_user: id_user,
      $or: [{ start_date: { $lte: end_date }, end_date: { $gte: start_date } }],
    });

    if (overlappingUserReservations.length > 0) {
      throw new AppError(
        400,
        'Você já tem uma reserva no período selecionado.',
      );
    }

    let startDate = new Date(reserveData.start_date);
    let endDate = new Date(reserveData.end_date);
    let timeDifference = endDate.getDate() - startDate.getDate();
    let reserveNumOfDays = timeDifference / (1000 * 3600 * 24);
    reserveNumOfDays = Math.ceil(reserveNumOfDays);

    const value_per_day = carData.car.value_per_day;

    const final_value = value_per_day * reserveNumOfDays;

    const reserveCompleteData = {
      ...reserveData,
      final_value,
    };

    const requiredFields = [
      'id_user',
      'start_date',
      'end_date',
      'id_car',
      'final_value',
    ];
    for (const field of requiredFields) {
      if (!reserveCompleteData[field]) {
        throw new AppError(400, `Field '${field}' is required`);
      }
    }

    return reserveCompleteData;
  }

  public async getReserveById(reserveId: string): Promise<any> {
    const reserve = await Reserve.findById(reserveId);
    if (!reserve) {
      throw new AppError(404, 'Reserva não encontrada');
    }
  }

  public async updateReserve(
    id: string,
    reserveData: any,
    carData: any,
    userData: any,
  ): Promise<any> {
    if (!userData.qualified) {
      throw new AppError(
        400,
        'O usuário deve possuir uma carteira de motorista.',
      );
    }

    const { id_car, id_user, start_date, end_date } = reserveData;
    const overllapingCarReserves = await Reserve.find({
      id_car: id_car,
      $or: [
        { start_date: { $lte: start_date }, end_date: { $gte: start_date } },
        { start_date: { $lte: end_date }, end_date: { $gte: end_date } },
      ],
    });
    if (overllapingCarReserves.length > 0) {
      throw new AppError(
        400,
        'Já existe uma reserva para o carro no mesmo período.',
      );
    }

    const overlappingUserReservations = await Reserve.find({
      id_user: id_user,
      $or: [{ start_date: { $lte: end_date }, end_date: { $gte: start_date } }],
    });

    if (overlappingUserReservations.length > 0) {
      throw new AppError(
        400,
        'Você já tem uma reserva no período selecionado.',
      );
    }

    let startDate = new Date(reserveData.start_date);
    let endDate = new Date(reserveData.end_date);
    let timeDifference = endDate.getDate() - startDate.getDate();
    let reserveNumOfDays = timeDifference / (1000 * 3600 * 24);
    reserveNumOfDays = Math.ceil(reserveNumOfDays);

    const value_per_day = carData.car.value_per_day;

    const final_value = value_per_day * reserveNumOfDays;

    const reserveCompleteData = {
      ...reserveData,
      final_value,
    };

    const requiredFields = [
      'id_user',
      'start_date',
      'end_date',
      'id_car',
      'final_value',
    ];
    for (const field of requiredFields) {
      if (!reserveCompleteData[field]) {
        throw new AppError(400, `Field '${field}' is required`);
      }
    }

    return reserveCompleteData;
  }

  public async deleteReserve(id: any): Promise<any> {
    const findById = await Reserve.findById(id);
    if (!findById) {
      throw new AppError(404, 'Reserva não encontrada');
    }
  }
}
