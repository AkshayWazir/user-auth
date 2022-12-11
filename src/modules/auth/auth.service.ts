import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateCred(email: string, password: string) {
    const user = await this.userService.getUserByEmail({ email: email });
    if (!user) throw new BadRequestException();
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
