/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:07:40
 * @LastEditTime: 2023-06-02 11:27:13
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */

import { Global, Module, Provider } from '@nestjs/common';
import { mongoose, getModelForClass } from '@typegoose/typegoose'
import { User } from './schema/user';
import { Article } from './schema/article';
import { Hotel } from './schema/hotel'
import { Room } from './schema/rooms'
import { Comment } from './schema/comment'
const createTime = {
  schemaOptions: {
    timestamps:{
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
}
const providers: Provider[] = [
  {
    provide: 'DB_CONNECTION',
    useFactory: () => mongoose.connect('mongodb://127.0.0.1:27017/hotel')
  },
  {
    provide: User.name,
    useFactory: () => getModelForClass(User, createTime)
  },
  {
    provide: Article.name,
    useFactory: () => getModelForClass(Article, createTime)
  },
  {
    provide: Hotel.name,
    useFactory: () => getModelForClass(Hotel, createTime)
  },
  {
    provide: Room.name,
    useFactory: () => getModelForClass(Room, createTime)
  },
  {
    provide: Comment.name,
    useFactory: () => getModelForClass(Comment, createTime)
  },
]
@Global()
@Module({
  providers,
  exports: providers,
})
export class DbModule { }
