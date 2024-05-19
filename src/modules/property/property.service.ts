import { PaginateConfig } from './../../../node_modules/nestjs-paginate/lib/paginate.d';
import { CityRepository } from './../location/repository';
import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './poperty.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreatePropertyDto } from './dtos/createPropertyDto';
import { Property } from './entity/property.entity';
import {
  FilterOperator,
  FilterSuffix,
  Paginate,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';
import { PropertyImageRepository } from './popertyImage.repositoy';
import { UploadImageDto } from './dtos/uploadImage.dto';
import { PropertyImage } from './entity/propertyImage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export const propertyConfig: PaginateConfig<Property> = {
  sortableColumns: ['id', 'name'],
  nullSort: 'last',
  // defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['name'],
  select: [
    // 'id',
    'name',
    // 'address',
    // 'city.(city_name)',

    // 'currency',
    // 'description',
    // 'total_fraction',
    // 'sold_fraction',
    // 'price_per_fraction',
    // 'returns_rate',
    // 'propertyImage.(image_path)',
  ],
  relations: {
    propertyImage: true,
    city: {
      state: {
        country: {},
      },
    },
  },
  loadEagerRelations: true,
  defaultLimit: 10,

  // filterableColumns: {
  //   name: [FilterOperator.EQ, FilterSuffix.NOT],
  // },
};

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly basePropertyRepository: Repository<Property>,
    private readonly propertyRepository: PropertyRepository,
    private readonly cityRepository: CityRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createPropery(data: CreatePropertyDto) {
    try {
      const findCityRes = await this.cityRepository.find({ id: data.city_id });
      if (findCityRes) {
        const entity = this.mapper.map(data, CreatePropertyDto, Property);

        entity.city = findCityRes;
        entity.propertyImage = data.propertyImage.map(
          (item) =>
            new PropertyImage({
              image_path: item.image_path,
              property: entity,
            }),
        );
        let dd = await this.mapper.mapAsync(
          await this.propertyRepository.create(entity),
          CreatePropertyDto,
          Property,
        );
        console.log(dd, 'property', entity);
        return {
          success: true,
          message: `Property Successfully Created`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // async uploadPropertyImage(data: UploadImageDto[]) {
  //   try {
  //     const res = await this.propertyImageRepository.createMany(data);

  //     console.log(res, '------some new response----');

  //     return {
  //       success: true,
  //       message: 'Uploading Successfull',
  //       data: res,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async getALlProperties(query: PaginateQuery) {
    try {
      // let dd = await this.mapper.mapArrayAsync(

      //   Property,
      //   ReadPropertyDto,
      // );

      // let dd = await this.propertyRepository.findAll({
      //   relations: ['propertyImage'],
      //   loadEagerRelations: true,
      // });

      return paginate(query, this.basePropertyRepository, propertyConfig);
    } catch (error) {
      throw error;
    }
  }
}
