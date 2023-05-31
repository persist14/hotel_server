/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:07:40
 * @LastEditTime: 2023-05-26 15:49:34
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */
/* eslint-disable prettier/prettier */
import { Global, Module, Provider } from '@nestjs/common';
import { mongoose, getModelForClass } from '@typegoose/typegoose'
import { DbService } from './db.service';
import { User } from './schema/user';
import { Article } from './schema/article';
const providers: Provider[] = [
  {
    provide: 'DB_CONNECTION',
    useFactory: () => mongoose.connect('mongodb://127.0.0.1:27017/nest')
  },
  {
    provide: User.name,
    useFactory: () => getModelForClass(User)
  },
  {
    provide: Article.name,
    useFactory: () => getModelForClass(Article)
  }
]
@Global()
@Module({
  providers,
  exports: providers,
})
export class DbModule { }
