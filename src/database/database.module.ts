import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD2323245A';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    // user: 'root',
    // pass: 'root',
    // dbName: 'platzi-store'})
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(dbName);
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
