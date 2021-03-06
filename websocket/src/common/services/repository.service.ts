import {Injectable} from '@nestjs/common';
import {getManager, ObjectID, Repository} from 'typeorm';
import {ResultList} from '../interfaces/result.interface';

export interface Id {
  id: string | number | Date | ObjectID;
}

@Injectable()
export class RepositoryService<T extends Id> {

  constructor(
    private repository: Repository<T>,
  ) { }

  async findAll(index: number, size: number, query: string): Promise<ResultList<T>> {
    return new Promise<ResultList<T>>(async (x) => {
      const result: ResultList<T> = {
        list: await this.repository.find({ skip: size * (index - 1), take: size, where: query}),
        count: await this.repository.count({where: query}),
        query: {
          index,
          size,
        },
      };
      x(result);
    });
  }

  async findOne(id: string | number | Date | ObjectID): Promise<T> {
    return await this.repository.findOne(id);
  }

  async create(entity: any): Promise<any> {
    return await this.repository.save(entity);
  }

  async update(entity: T): Promise<any> {
    const index = await this.repository.findOne(entity.id);
    if (index) {
      Object.assign(index, entity);
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(index);
      });
      return index;
    }
  }

  async remove(id: string | number | Date | ObjectID): Promise<any> {
    const entity = await this.repository.findOne(id);
    return await this.repository.remove(entity);
  }

}
