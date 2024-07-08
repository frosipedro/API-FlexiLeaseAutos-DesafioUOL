import AppError from '../../utils/AppError';
import { ICar } from '../cars/car.model';
import Reserve from '../reserves/reserve.model';
import { IReserveUserCreate } from '../reserves/reserve.model';
import { IUser } from '../users/user.model';
import { formatDateToString } from '../../utils/dateConverter';

export class ReserveMiddleware {
  public async createReserve(
    reserveData: IReserveUserCreate,
    carData: ICar,
    userData: IUser,
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

    let startDate = formatDateToString(reserveData.start_date);
    let endDate = formatDateToString(reserveData.end_date);
    const reserveNumOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const value_per_day = carData.value_per_day;
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
      if (!reserveData[field]) {
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
    id: any,
    reserveData: IReserveUserCreate,
    carData: ICar,
    userData: IUser,
  ): Promise<any> {
    const findById = await Reserve.findById(id);
    if (!findById) {
      throw new AppError(404, 'Reserva não encontrada');
    }

    const requiredFields = [
      'id_user',
      'start_date',
      'end_date',
      'id_car',
      'final_value',
    ];
    for (const field of requiredFields) {
      if (!reserveData[field]) {
        throw new AppError(400, `Field '${field}' is required`);
      }
    }

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

    const reserveNumOfDays = Math.ceil(
      (new Date(reserveData.end_date).getTime() -
        new Date(reserveData.start_date).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const value_per_day = carData.value_per_day;
    const final_value = value_per_day * reserveNumOfDays;
    const reserveCompleteData = {
      ...reserveData,
      final_value,
    };
    return reserveCompleteData;
  }

  public async deleteReserve(id: any): Promise<any> {
    const findById = await Reserve.findById(id);
    if (!findById) {
      throw new AppError(404, 'Reserva não encontrada');
    }
  }
}
