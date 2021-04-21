import { GqlAuthGuard } from './../../authentication/jwt/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserInputType, UserUpdateInputType } from './dto/user.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  public async userByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.findEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  public async updateUser(
    @Args('data') input: UserUpdateInputType,
  ): Promise<User> {
    return this.userService.updateUser(input);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInputType): Promise<User> {
    return this.userService.createUser(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  public async deleteUser(@Args('id') id: string): Promise<true> {
    await this.userService.deleteUser(id);
    return true;
  }
}
