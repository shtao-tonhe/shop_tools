import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Search } from './entities/search.entity';
// import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

import { uuidWithoutHyphen } from '../../utils/helper'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search)
    private searchRepository: Repository<Search>,
  ) { }

  async findAllBySearchTip(search: string) {
    return this.searchRepository
      .find({
        where: {
          // 在这里设置模糊查询条件，使用Like操作符
          // 这将在数据库中执行类似于 WHERE columnName LIKE '%keyword%' 的查询
          keyword: Like(`%${search}%`),
        },
        take: 10, // 限制结果为前十条
      })
  }

  async create(parmas) {
    const createOV = {
      id: uuidWithoutHyphen(),
      keyword: parmas.keyword,
      ip: parmas.ip,
    }
    console.log('createOV', createOV)
    // const optResult = this.searchRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Search)
    //   .values(createOV)
    //   .execute()
    // const optResult = this.searchRepository.insert(createOV)
    const optResult = this.searchRepository.insert(createOV)
    return optResult
  }

  async findById(id: number) {
    return await this.searchRepository
      .createQueryBuilder('search')
      .where('search.id = :id', { id })
      .getOne();
  }

  async updateById(id, newData) {
    await this.searchRepository.update(id, newData);
    return this.findById(id);
  }

  async deleteById(id) {
    console.log('--deleteById--', id)

    // result  { raw: any, affected: number}
    // raw: 包含有关底层数据库执行的原始信息的对象
    // affected: 表示受影响的行数。如果成功删除了记录，它将是一个正整数，表示删除的行数
    return await this.searchRepository.delete(id);
  }

  async findAll() {
    // return this.searchRepository.find();
    return this.searchRepository.createQueryBuilder('search').getMany();
  }

  async findAllUsers(page: number = 1, pageSize: number = 10) {
    //TODO: 分页
    const skip = (page - 1) * pageSize;

    const [list, total] = await Promise.all([
      this.searchRepository
        .createQueryBuilder('search')
        .select(['search.id', 'search.keyword', 'search.ip'])
        .skip(skip)
        .take(pageSize)
        .getMany(),
      this.searchRepository.count(), // 获取总用户数量
    ]);

    return { list, total };
  }

  async findAllUsersBySQL(page: number = 1, pageSize: number = 10) {
    //TODO: 分页
    const skip = (page - 1) * pageSize;

    // 使用原始SQL查询获取分页用户列表
    const list = await this.searchRepository.query(`
      SELECT id, ip, keyword
      FROM portal_search_record
      LIMIT ${pageSize}
      OFFSET ${skip}
    `);

    // 使用原始SQL查询获取总用户数量
    const total = await this.searchRepository.query(`
      SELECT COUNT(*) AS count
      FROM portal_search_record
    `);
    console.log('total---', total)
    return { list, total: total[0].count };
  }

  async findOneByIp(ip: string) {
    // return this.searchRepository.findOneBy({
    //   ip
    // });
    return this.searchRepository
      .createQueryBuilder('search')
      .where('search.ip = :ip', { ip })
      .getOne();
  }

  async findAllByIp(ip: string) {
    // return this.searchRepository.findBy({
    //   ip
    // })
    return this.searchRepository
      .createQueryBuilder('search')
      .where('search.ip = :ip', { ip })
      .getMany()
  }

  // async findOne(id: number) {
  //   return await this.searchRepository.findOneBy({
  //     id
  //   });
  // }

  async findOne1(id: number) {
    return await this.searchRepository
      .createQueryBuilder('logger')
      .getOne();
  }

  findHistory() {
    let resultData = {
      list: [
        {
          id: "21f1", text: "二十大", isBright: true, sort: 0,
        },
        {
          id: "5ff1", text: "乡村章程", isBright: false, sort: 1,
        },
      ],
      total: 2,
    }
    return resultData
  }

  recommendWord() {
    let resultData = {
      total: 3,
      // list: ['"七号"台风预警', '建造乡村未来生态', '齐心协力开展灾后恢复重建'],
      list: ['api推荐数据1', 'api推荐数据2', 'api推荐数据3'],
    };
    return resultData;
  }
}
