import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { HotelService } from './hotel.service';
import { AuthGuard } from '../guard/auth.guard';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  // @UseGuards(AuthGuard)
  @Get('list')
  async List(@Query() params: Record<string, any>): Promise<any> {
    const result = await this.hotelService.List(params);
    console.log(result);
    return result;
  }
  @Get('/:id')
  async detail(@Param() params: Record<string, string>) {
    const result = await this.hotelService.detail(params.id);
    return result
  }
  @Post('add')
  async Create(@Body() body: Record<string, any>): Promise<any> {
    const result = await this.hotelService.Create(body);
    console.log(result);
  }
}
