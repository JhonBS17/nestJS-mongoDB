import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productService: ProductsService, // private configService: ConfigService,
  ) {}

  findAll() {
    // const apiKey = this.configService.get('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    // console.log(apiKey, dbName);
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = new this.userModel();
    return newUser;
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return true;
  }

  async getOrdersByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
  }
}
