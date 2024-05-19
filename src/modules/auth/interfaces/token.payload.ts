import { Role } from '../users/entity/users.entity';

export interface TokenPayLoad {
  user_id: number;
  email: string;
  role: [Role];
}
