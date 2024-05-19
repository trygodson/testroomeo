import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { DatabaseModule } from '../database';
import { Property } from './entity/property.entity';
import { PropertyImage } from './entity/propertyImage.entity';
import { PropertyProfile } from './property.mapping';
import { PropertyRepository } from './poperty.repository';
import { CityRepository } from '../location/repository';
import { LocationModule } from '../location/location.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PropertyImageRepository } from './popertyImage.repositoy';
import { Repository } from 'typeorm';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Property, PropertyImage]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
          },
        };
      },
      inject: [ConfigService],
    }),

    LocationModule,
  ],
  providers: [
    PropertyService,
    PropertyProfile,
    PropertyRepository,
    PropertyImageRepository,
  ],
  controllers: [PropertyController],
})
export class PropertyModule {}
