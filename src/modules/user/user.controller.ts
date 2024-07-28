import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Session,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  constructor(
    @Inject('Config') private systemName: string,
    private readonly userService: UserService,
  ) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  @Post('addUser')
  create(@Req() request) {
    console.log('@-create-@', this.systemName);
    return {
      status: 200,
      msg: 'success',
      data: {
        name: this.systemName,
      },
    };
  }

  @Get('list')
  async findAll() {
    const data = await this.userService.findAll();
    return {
      code: 200,
      data: data,
    };
  }

  @Get('code')
  createCode(@Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 20,
      width: 40,
      height: 30,
      background: '#cc9966',
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('login')
  Login(@Req() request, @Session() session) {
    console.log('session中的验证码', session.code);
    console.log('@-Login的提交参数-@', request.body);
    if (session.code.toLowerCase() === request.body.code.toLowerCase()) {
      return {
        status: 200,
        msg: 'success',
        data: {
          ...request.body,
          token: 'asdjla2dj821d981j2d1o28jd12d',
        },
      };
    } else {
      return {
        status: 500,
        msg: 'error',
        data: {
          ...request.body,
        },
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
