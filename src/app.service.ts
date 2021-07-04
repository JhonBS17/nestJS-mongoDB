import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from "mongodb";
import config from "./config";

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string, //useValue
    @Inject('TASKS') private tasks: any[], //useFactory
    @Inject('MONGO') private database: Db, //useFactory
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey; // this.configService.get('API_KEY')
    const name = this.configService.database.name;
    return `Hello World! ${apiKey} ${name}`;
  }
  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
