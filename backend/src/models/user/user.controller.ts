import { UserService } from 'src/models/user/user.service';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryUserConfirmationType } from './interfaces/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('confirmation_email')
  async setConfirmEmail(
    @Query() query: QueryUserConfirmationType,
  ): Promise<{ confirmation: boolean }> {
    return await this.userService.confirmationEmail(query.id);
  }
}
