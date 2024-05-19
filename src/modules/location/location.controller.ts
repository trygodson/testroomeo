import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateCountryDto,
  CreateCityDto,
  CreateStateDto,
  GetCountryDto,
  GetStateDto,
  GetCityDto,
} from './dtos';
import { LocationService } from './location.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('country')
  async saveCountry(@Body() payload: CreateCountryDto) {
    return this.locationService.saveCounty(payload);
  }
  @Get('country/:id')
  async getCountry(@Param('id') id?: number) {
    return this.locationService.getCountry(id);
  }
  @Get('allcountry')
  async getAllCountry() {
    return this.locationService.getAllCountry();
  }
  @Post('state')
  async saveState(@Body() payload: CreateStateDto) {
    return this.locationService.saveState(payload);
  }
  @Get('state/:id?')
  async getState(@Param('id') id?: number) {
    return this.locationService.getState(id);
  }
  @Get('allstate')
  async getAllState() {
    return this.locationService.getAllState();
  }
  @Post('city')
  async saveCity(@Body() payload: CreateCityDto) {
    return this.locationService.saveCity(payload);
  }
  @Get('city/:id')
  async getCity(@Param('id') payload: number) {
    return this.locationService.getCity(payload);
  }
}
