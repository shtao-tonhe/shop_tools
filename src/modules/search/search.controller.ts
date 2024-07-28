
import { ParseIntPipe, ParseArrayPipe, UseInterceptors, UseGuards, Ip, Req, Controller, Get, Post, Body, Patch, Param, Query, Delete, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { timer } from "rxjs";
import { SearchService } from './search.service';
import { Search } from './entities/search.entity';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter'

import { UseroptlogInterceptor } from "../../common/interceptors/useroptlog.interceptor";
import { AuthGuard } from "../../common/guards/auth.guard"

@Controller('search')
// @UseInterceptors(UseroptlogInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get()
  async getSearchTip(@Query('keyword') keyword: string) {
    if (!keyword) {
      return {
        code: 200,
        list: [],
      }
    }
    const results = await this.searchService.findAllBySearchTip(keyword)
    return {
      code: 200,
      list: results
    }
  }

  @Post('enterKeyWord')
  // @UseGuards(AuthGuard)
  // create(@Body('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.GATEWAY_TIMEOUT })) createSearchDto: CreateSearchDto) {
  // create(@Body('id') Body, createSearchDto: CreateSearchDto) {
  async enterKeyWord(@Body() body, @Ip() ip) {
    const { keyword } = body;
    const result = await this.searchService.create({ keyword, ip })
    return {
      code: 200,
      data: result
    }
    // try {
    //   const data = await new Promise<any>((resolve) => {
    //     timer(2000) // 模拟一个超过2s的操作
    //       .subscribe(() => {
    //         resolve('Your data');
    //       });
    //   });

    //   return data; // 返回数据
    // } catch (error) {
    //   return 'Request timed out';
    // }
  }

  @Get('historyWord')
  @UseFilters(new HttpExceptionFilter())
  historyWord(@Req() req) {
    try {
      return {
        code: 200,
        data: this.searchService.findHistory(),
      }
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('recommendWord')
  @UseFilters(new HttpExceptionFilter())
  recommendWord(@Req() req) {
    try {
      return {
        code: 200,
        data: this.searchService.recommendWord(),
      }
    } catch (error) {
      throw new HttpException('error', HttpStatus.FORBIDDEN);
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.searchService.findOne(+id)
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
    return this.searchService.updateById(+id, updateSearchDto)
  }

  @Get('remove/:id')
  async remove(@Param('id') id: string) {
    console.log('删除的id', id)
    const result = await this.searchService.deleteById(id)
    console.log('result--del---', result)
    if (result.affected > 0) {
      return {
        code: 200,
        message: 'success',
      }
    } else {
      return {
        code: 500,
        message: 'error',
      }
    }
  }

  @Get('list')
  async findAll() {
    const data = await this.searchService.findAll()
    return {
      code: 200,
      data: data
    }
  }

  @Post('getAll')
  async findAllUsers(@Body() body
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    const { list, total } = await this.searchService.findAllUsers(body.page, body.pageSize);
    console.log('结果', body.page)
    return {
      code: 200,
      data: {
        page: body.page,
        pageSize: body.pageSize,
        total,
        list,
      }
    }
  }

  @Post('getAll2')
  async findAllUsersBySQL(@Body() body) {
    const { list, total } = await this.searchService.findAllUsersBySQL(body.page, body.pageSize);
    console.log('结果', body.page)
    return {
      code: 200,
      data: {
        page: body.page,
        pageSize: body.pageSize,
        total,
        list,
      }
    }
  }

  @Get('findOneByIp/:ip')
  async findOneByIp(@Param('ip') ip: string) {
    console.log(`--findOneByIp--${ip}`)
    const data = await this.searchService.findOneByIp(ip)
    return {
      code: 200,
      data: data
    }
  }

  @Get('findAllByIp/:ip')
  async findAllByIp(@Param('ip') ip: string) {
    console.log(`--findAllByIp--${ip}`)
    const data = await this.searchService.findAllByIp(ip)
    return {
      code: 200,
      data: data
    }
  }

  // @Get('findAllByIp/:ip')
  // async findAllByIp(@Param('ip') ip: string) {
  //   console.log(`--findAllByIp--${ip}`)
  //   const data = await this.searchService.findAllByIp(ip)
  //   return {
  //     code: 200,
  //     data: data
  //   }
  // }
}




