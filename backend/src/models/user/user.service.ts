import { UpdateUserInputType } from './interfaces/user.interface';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInputType } from './dto/user.input';
import SendEmail from 'src/mails/sendEmail';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async updateUser(data: UpdateUserInputType): Promise<User> {
    const user = await this.userRepository.findOne(data.id);
    if (!user) {
      throw new NotFoundException('User Id not found!');
    }
    return this.userRepository.save({ ...user, ...data });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    const userDeleted = await this.userRepository.delete(user);
    if (!userDeleted) {
      throw new InternalServerErrorException();
    }
  }

  async createUser(input: UserInputType): Promise<User> {
    const user = this.userRepository.create({
      name: input.name,
      email: input.email,
      password: input.password,
      profile_url: null,
      is_active: true,
      confirmation_email: false,
    });
    const userSaved = await this.userRepository.save(user);

    SendEmail.sendConfirmationEmail(input.name, input.email, userSaved.id);

    return userSaved;
  }

  async confirmationEmail(id: string): Promise<string> {
    await this.updateUser({ id, confirmation_email: true });

    return `{ confirmation: true }`;
  }
}
