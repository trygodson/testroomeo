import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common';
import { DatabaseModule } from 'src/modules/database';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UserMappingProfile } from './mapping_profile/user.profile';
import { User } from './entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt.strategies';
import { LocalStrategy } from '../strategies/local.strategies';
import { RefreshToken } from './entity/refreshtoken.entity';
import { RefreshTokenReposiotry } from './refreshToken.repository';
import { WalletModule } from 'src/modules/wallet/wallet.module';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';
import { NotificationsService } from 'src/modules/notifications/notifications.service';

@Module({
  imports: [
    DatabaseModule,
    NotificationsModule,
    DatabaseModule.forFeature([User, RefreshToken]),
    LoggerModule,
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

    WalletModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    NotificationsService,
    UsersRepository,
    RefreshTokenReposiotry,
    UserMappingProfile,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UsersService, UsersRepository, RefreshTokenReposiotry],
})
export class UsersModule {}
