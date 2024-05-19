import { PropertyService, propertyConfig } from './property.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePropertyDto } from './dtos/createPropertyDto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { RolesGuard } from '../auth/guards/roles-auth.guard';
import { Role } from '../auth/users/entity/users.entity';
import { UploadImageDto } from './dtos/uploadImage.dto';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';

@ApiBearerAuth()
@ApiTags('Property')
@Controller('property')
@UseGuards(JwtAuthGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async createProperty(@Body() payload: CreatePropertyDto) {
    return this.propertyService.createPropery(payload);
  }

  // @Post('uploadPropertyImage')
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  // async uploadPropertyImage(@Body() payload: UploadImageDto[]) {
  //   // return { sucess: true };
  //   return this.propertyService.uploadPropertyImage(payload);
  // }

  @Get()
  @ApiPaginationQuery(propertyConfig)
  async getAllProperty(@Paginate() query: PaginateQuery) {
    return this.propertyService.getALlProperties(query);
  }
}
