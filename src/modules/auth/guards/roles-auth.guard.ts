import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayLoad } from '../interfaces/token.payload';

/**
 * @deprecated Roles guard is a simplistic RBAC approach where we just check whether the user has certain roles
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    const jwt = context.switchToHttp().getRequest<Request>()
      .headers?.authorization;

    if (!requiredRoles || requiredRoles.length === 0) return false;

    const decodedToken: TokenPayLoad = this.jwtService.verify(
      jwt.split(' ')[1],
      this.configService.get('JWT_SECRET'),
    );

    return requiredRoles.some((role) => decodedToken.role.includes(role));
  }
}
