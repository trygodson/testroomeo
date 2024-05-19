import { Injectable } from '@nestjs/common';
import {
  CityRepository,
  StateRepository,
  CountryRepository,
} from './repository';
import { CreateCountryDto } from './dtos';
import { City, Country, State } from './entity';
import { GetCountryDto } from './dtos/getLocation.dto';
import { CreateStateDto } from './dtos/createState.dto';
import { CreateCityDto } from './dtos/createCity.dto';

@Injectable()
export class LocationService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly stateRepository: StateRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  async saveCounty(data: CreateCountryDto) {
    try {
      const newCountry = new Country({
        ...data,
      });
      const res = await this.countryRepository.create(newCountry);

      if (res) {
        return {
          success: true,
          message: `${data.country_name} Added Successfully`,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async getCountry(data) {
    try {
      const res = await this.countryRepository.find(
        {
          id: data,
        },
        {},
      );

      if (res) {
        return {
          success: true,
          message: `Retrieved Successfully`,
          data: res,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async getAllCountry() {
    try {
      const res = await this.countryRepository.findAll();

      if (res) {
        return {
          success: true,
          message: `Retrieved Successfully`,
          data: res,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async saveState(data: CreateStateDto) {
    try {
      const res = await this.countryRepository.find(
        {
          id: data.country_id,
        },
        {},
      );

      const newState = new State({
        state_name: data.state_name,
        country: res,
      });
      const ress = await this.stateRepository.create(newState);

      if (ress) {
        return {
          success: true,
          message: `${data.state_name} Added Successfully`,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async getState(state_id?: any) {
    try {
      const res = await this.stateRepository.find(
        {
          id: state_id,
        },
        {
          ['country']: {},
        },
      );

      if (res) {
        return {
          success: true,
          message: `Retrieved Successfully`,
          data: res,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async getAllState() {
    try {
      const res = await this.stateRepository.findAll({
        relations: {
          ['country']: {},
        },
      });
      if (res) {
        return {
          success: true,
          message: `Retrieved Successfully`,
          data: res,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async saveCity(data: CreateCityDto) {
    try {
      const res = await this.stateRepository.find(
        {
          id: data.state_id,
        },
        {},
      );

      const newState = new City({
        city_name: data.city_name,
        state: res,
      });
      const ress = await this.stateRepository.create(newState);

      if (ress) {
        return {
          success: true,
          message: `${data.city_name} Added Successfully`,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async getCity(city_id: number) {
    try {
      const res = await this.cityRepository.find(
        {
          id: city_id,
        },
        {
          ['state']: {
            ['country']: {},
          },
        },
      );

      if (res) {
        return {
          success: true,
          message: `Retrieved Successfully`,
          data: res,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
