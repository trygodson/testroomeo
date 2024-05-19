import { RefreshTokenReposiotry } from './users/refreshToken.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { User } from '../../../libs/common/src/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayLoad } from './interfaces/token.payload';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { User as UserEntity } from './users/entity/users.entity';
import { GenerateOtp } from 'src/common/utils/otpgenerator';
import * as moment from 'moment';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  protected logger: Logger = new Logger();

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly refreshTokenReposiotry: RefreshTokenReposiotry,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly notificationsService: NotificationsService,

    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async generateAccessTokenFromRefreshToken(
    refreshString: string,
    response: Response,
  ): Promise<any> {
    try {
      const refreshTokenEntity = await this.userService.retrieveRefreshToken(
        refreshString,
      );

      // console.log(refreshTokenEntity);
      if (!refreshTokenEntity) {
        return undefined;
      }

      if (moment(refreshTokenEntity.expiresAt).toDate() < moment().toDate()) {
        await this.refreshTokenReposiotry.findOneAndUpdate(
          { token: refreshString },
          { is_deleted: true },
        );
        return new UnprocessableEntityException(
          'Refresh token Expired Pls Login Again',
        );
      }

      const access_token = this.jwtService.sign(
        {
          user_id: refreshTokenEntity.user.id,
          email: refreshTokenEntity.user.email,
        },
        {
          expiresIn: '10m', // Adjust as needed
        },
      );

      return {
        status: 'success',
        access_token,
      };
    } catch (error) {
      // console.log(error, '----');
      return new UnprocessableEntityException('Invalid token String');
    }
  }

  async login(user: UserEntity) {
    try {
      if (user.otp_verified === false) {
        const { expiry, otp } = GenerateOtp();
        const updateRepo = await this.usersRepository.findOneAndUpdate(
          { id: user.id },
          { otp_code: '123456', otp_expiry: expiry },
        );
        if (updateRepo) {
          await this.notificationsService.notifyEmail({
            email: updateRepo.email,
            text: updateRepo.otp_code,
          });
          const verification_token = this.jwtService.sign(
            {
              email: updateRepo.email,
              code: updateRepo.otp_code,
              expiry: updateRepo.otp_expiry,
            },
            {
              expiresIn: '5m', // Access token expiration time
            },
          );

          return {
            success: true,
            messsage: 'Account Unverified OTP Sent',
            data: { verification_token, account_verified: false },
          };
        }
      } else {
        const refresh_token = await this.userService.generateRefreshToken(user);
        const access_token = await this.userService.generateAccessTokens(user);

        return {
          status: 'success',
          access_token,
          refresh_token,
        };
      }
    } catch (error) {
      throw error;
    }

    // response.cookie('Authentication', token, {
    //   expires,
    //   httpOnly: true,
    // });
  }
}
