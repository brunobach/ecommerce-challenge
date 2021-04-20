import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import 'dotenv/config';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  synchronize: true,
  // ssl: { rejectUnauthorized: false },
  entities: ['dist/models/**/entities/*.entity{.ts,.js}'],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
  cli: {
    migrationsDir: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
};

module.exports = options;
