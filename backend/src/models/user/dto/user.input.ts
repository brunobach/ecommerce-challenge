import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UserInputType {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}

@InputType()
class UserUpdateInputType {
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly email: string;
  @Field({ nullable: true })
  readonly password: string;
  @Field({ nullable: true })
  readonly profile_url: string;
}

export { UserInputType, UserUpdateInputType };
