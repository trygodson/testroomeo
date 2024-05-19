import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../entity/users.entity';

const getCurrentUserByContext = (ctx: ExecutionContext): User => {
  return ctx.switchToHttp().getRequest().user;
};
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
