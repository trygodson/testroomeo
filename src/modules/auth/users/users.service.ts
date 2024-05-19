import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper, forMember } from '@automapper/core';
import { User } from './entity/users.entity';
import { LoginDto } from './dtos/login.dto';
import { GenerateOtp } from 'src/common/utils/otpgenerator';
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { ConfigService } from '@nestjs/config';
import { TokenPayLoad } from '../interfaces/token.payload';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ReadUserDto } from './dtos/read-user.dto';
import { Response } from 'express';
import { RefreshToken } from './entity/refreshtoken.entity';
import * as moment from 'moment';
import { RefreshTokenReposiotry } from './refreshToken.repository';
import { generateRandomString } from 'src/common/utils/randomString';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { WalletService } from 'src/modules/wallet/wallet.service';
import { NotificationsService } from 'src/modules/notifications/notifications.service';
import { ResetForgotPasswordDto } from './dtos/resetForgotPassword.dto';

@Injectable()
export class UsersService {
  protected readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokenReposiotry: RefreshTokenReposiotry,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly walletService: WalletService,
    private readonly notificationsService: NotificationsService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async create(createUser: RegisterUserDto) {
    try {
      // await this.validateCreateUser(createUser);

      let usd = await this.usersRepository.signUp(createUser);

      let dUser: RegisterUserDto = {
        ...createUser,
        password: await bcrypt.hash(createUser.password, 12),
      };
      const entity = await this.mapper.mapAsync(dUser, RegisterUserDto, User);
      const { expiry, otp } = GenerateOtp();

      entity.otp_code = otp.toString();
      entity.otp_expiry = expiry;
      let dd = await this.mapper.mapAsync(
        await this.usersRepository.create(entity),
        CreateUserDto,
        User,
      );

      // await this.notificationsService.notifyEmail({
      //   email: dUser.email,
      //   text: entity.otp_code,
      // });
      const verification_token = this.jwtService.sign(
        { email: dd.email, code: dd.otp_code, expiry: dd.otp_expiry },
        {
          expiresIn: '5m', // Access token expiration time
        },
      );

      return {
        success: true,
        messsage: 'User Created Successfully Otp Sent',
        data: { verification_token },
      };
    } catch (error) {
      throw error;
    }
  }

  async generateRefreshToken(user: User) {
    try {
      const prevRefresh = await this.refreshTokenReposiotry.find({
        user: { id: user.id },
        is_deleted: false,
      });
      if (prevRefresh) {
        return prevRefresh.token;
      } else {
        const refreshToken = new RefreshToken({
          expiresAt: moment().add(7, 'days').toDate(),
          user: user,
          token: generateRandomString(),
        });
        const res = await this.refreshTokenReposiotry.create(refreshToken);

        return res.token;
      }
    } catch (error) {
      throw error;
    }
  }
  async generateAccessTokens(user: User) {
    const accessTokenPayload: TokenPayLoad = {
      user_id: user.id,
      email: user.email,
      role: [user.role],
    };

    const access_token = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '1h', // Access token expiration time
    });

    return access_token;
  }
  async retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      return await this.refreshTokenReposiotry.findOne(
        {
          token: refreshStr,
        },
        {
          ['user']: {},
        },
      );
    } catch (e) {
      throw e;
    }
  }
  async verifyUserOtp(verifyToken: VerifyOtpDto) {
    try {
      const decodedToken = this.jwtService.verify(
        verifyToken.verification_token,
        this.configService.get('JWT_SECRET'),
      );
      const res = await this.usersRepository.findOne({
        email: decodedToken.email,
      });

      if (res) {
        if (res.otp_code === verifyToken.otp_code) {
          const createWalletRes = await this.walletService.createWallet(res);
          await this.notificationsService.notifyEmailSubscription({
            email: res.email,
            name: `${res.first_name} ${res.last_name}`,
          });

          if (createWalletRes) {
            const refresh_token = await this.generateRefreshToken(res);
            const access_token = await this.generateAccessTokens(res);
            await this.usersRepository.findOneAndUpdate(
              { email: res.email },
              { otp_verified: true },
            );

            return {
              success: true,
              refresh_token,
              access_token,
            };
          }
        } else {
          throw new UnauthorizedException('Incorrect OTP Code.');
        }
      }
    } catch (err) {
      if (err.message.includes('expired')) {
        throw new UnauthorizedException('Token Has Expired! Please Try Again.');
      } else {
        throw new UnauthorizedException(err?.message ?? 'Error Verifying');
      }
    }
  }

  private async validateCreateUser(createUser: LoginDto) {
    const res = await this.usersRepository.find({
      email: createUser.email,
    });
    if (res) {
      throw new BadRequestException('Email Already Exists');
    } else {
      return;
    }
  }

  async forgotPassword(email: string) {
    try {
      const theuser = await this.usersRepository.find({ email });

      if (!theuser) {
        throw new UnauthorizedException('User Does Not Exist');
      }
      const { expiry, otp } = GenerateOtp();
      let dd = await this.usersRepository.findOneAndUpdate(
        { id: theuser.id },
        { otp_code: otp, otp_expiry: expiry },
      );

      await this.notificationsService.notifyEmail({
        email: theuser.email,
        text: otp,
      });

      const verification_token = this.jwtService.sign(
        { email: dd.email, code: dd.otp_code, expiry: dd.otp_expiry },
        {
          expiresIn: '5m', // Access token expiration time
        },
      );
      return {
        success: true,
        messsage: 'OTP Verification Email Successfully Sent',
        data: { verification_token },
      };
    } catch (error) {
      throw error;
    }
  }
  async resetForgotPassword(data: ResetForgotPasswordDto) {
    try {
      const decodedToken = this.jwtService.verify(
        data.verification_token,
        this.configService.get('JWT_SECRET'),
      );
      const res = await this.usersRepository.find({
        email: decodedToken.email,
      });
      if (res) {
        if (res.otp_code === data.otp_code) {
          const updatedUser = await this.usersRepository.findOneAndUpdate(
            { email: decodedToken.email },
            { password: await bcrypt.hash(data.password, 12) },
          );

          if (!updatedUser) {
            throw new UnauthorizedException('Error Updating User');
          }
          return {
            success: true,
            messsage: 'Password is Successfuly Changed',
            // data: { verification_token },
          };
        }
      }
    } catch (err) {
      if (err.message.includes('expired')) {
        throw new UnauthorizedException('Token Has Expired! Please Try Again.');
      } else {
        throw new UnauthorizedException(err?.message ?? 'Error Verifying');
      }
    }
  }

  async verifyUser(email: string, password: string): Promise<User | never> {
    const dd = password;
    const theuser = await this.usersRepository.findOne({ email });

    if (!theuser) {
      throw new UnauthorizedException('User Does Not Exist');
    }

    const isPasswordValid = await bcrypt.compare(dd, theuser.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials Not Valid');
    }

    return theuser;
  }
  async getUser({ id }: GetUserDto) {
    try {
      return this.usersRepository.findOne({ id: id });
    } catch (error) {
      throw new UnauthorizedException('User Does Not Exist');
    }
  }
  async updateUser(user: User, updateData: UpdateUserDto, response: Response) {
    // return this.usersRepository.findOne({ id: id }, { roles: true });
    try {
      const entity = await this.mapper.mapAsync(
        updateData,
        UpdateUserDto,
        User,
      );
      entity.profile_level = 2;
      const res = await this.mapper.mapAsync(
        await this.usersRepository.findOneAndUpdate(
          { id: user.id },
          { ...entity },
        ),

        User,
        UpdateUserDto,
      );
      if (res) {
        response.send({
          status: true,
          message: 'User Updated Successfully',
        });
      }
    } catch (error) {
      console.log(error, '-----eooeo');
      throw new UnprocessableEntityException(
        error?.message ?? 'Error Updating',
      );
    }
  }
}
