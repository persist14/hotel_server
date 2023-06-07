import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';

interface RoomOpts {
  h_id: string;
  cmt_id: string;
  cover: string;
  level: number;
  residents: number;
  price: number;
  intro: string;
  img_arr: string[];
  rate: {};
  living: boolean;
  liv_start_time: string;
  liv_end_time: string;
}

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // @UseGuards(AuthGuard)
  @Get()
  async List(@Query() params: Record<string, any>): Promise<any> {
    const result = await this.hotelService.List(params);
    return result;
  }

  @Get('/:id/detail')
  async detail(@Param() params: Record<string, string>) {
    const result = await this.hotelService.detail(params.id);
    return result;
  }

  @Get('/search')
  async search(@Query() params: Record<string, any>): Promise<any> {
    const result = await this.hotelService.SearchHt(params);
    return result;
  }

  @Post('add')
  async Create(@Body() body: Record<string, any>): Promise<any> {
    const result = await this.hotelService.Create(body);
    console.log(result);
  }

  // 添加房间
  @Post('/room/add')
  async CreateRoom(@Body() body: Record<string, any>): Promise<any> {
    const result = await this.hotelService.roomCreate(body);
    return result;
  }
}
