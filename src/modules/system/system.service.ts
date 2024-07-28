import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Injectable()
export class SystemService {
  create(createSystemDto: CreateSystemDto) {
    return 'This action adds a new system';
  }

  config() {
    return {
      title: "YiLong village website",
      footer: {
        links: [
          {
            sort: 0,
            url: "https://vip.hzylsq.com",
            isExternal: true,
            label: "亿龙管理平台"
          },
          {
            sort: 1,
            url: "https://www.baidu.com",
            isExternal: true,
            label: "xx镇网站"
          },
          {
            sort: 2,
            url: "https://www.hzylsq.com/",
            isExternal: true,
            label: "南浔镇网站"
          },
          {
            sort: 3,
            url: "https://www.hzylsq.com/",
            isExternal: true,
            label: "南浔镇网站"
          },
        ]
      },
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
