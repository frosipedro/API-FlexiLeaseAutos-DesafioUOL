import { DataSource } from 'typeorm';
import Car from '../api/models/car.model';
import Booking from '../api/models/booking.model';
import User from '../api/models/user.model';

export class Database {
  private static instance: Database;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'mongodb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'FlexiLeaseAutos',
      entities: [Car, Booking, User],
      synchronize: true,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
