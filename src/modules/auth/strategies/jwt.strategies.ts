import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayLoad } from '../interfaces/token.payload';
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(private readonly configService: ConfigService) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          // console.log(request?.headers, 'request?.headers?.Authorization');
          return (
            request?.headers?.authorization &&
            request?.headers?.authorization.split(' ')[1]
          );
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(dd: TokenPayLoad) {
    try {
      return { ...(await this.usersService.getUser({ id: dd.user_id })) };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    // try {
    //   const res = await this.usersService.verifyUser(email, password);
    //   return res;
    // } catch (error) {
    //   throw new UnauthorizedException(error);
    // }
  }
}
