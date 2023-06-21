import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import crypto from 'md5-es';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async trans(query): Promise<any> {
    let rdata;
    const cryptoKeys = `/ws/coord/v1/translate?locations=${query.posiInfo.latitude},${query.posiInfo.longitude}&type=1&key=${query.mapKeys}YP6oeRpVgK6e6exW1nx3GEVKi3QQY1S`;
    const md5Crypto = crypto.hash(cryptoKeys);
    const httpUrl = `https://apis.map.qq.com/ws/coord/v1/translate?locations=${query.posiInfo.latitude},${query.posiInfo.longitude}&type=4&key=${query.mapKeys}&sig=${md5Crypto}`;
    // 发送请求获取第三方接口的经纬度信息
    const data = await this.httpService.axiosRef.get(httpUrl, {
      withCredentials: true,
    });
    return data.data;
  }
}
