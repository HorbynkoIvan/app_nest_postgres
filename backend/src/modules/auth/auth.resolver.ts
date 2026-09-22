import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthService } from './auth.service';
import { RegisterInput } from "./dto/register.input";
import { UserEntity } from "../users/entities/user.entity";
import { LoginInput } from "./dto/login.input";
import { AuthPayload } from './dto/auth.payload';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => UserEntity)
  async register(@Args('input') input: RegisterInput): Promise<UserEntity> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    return this.authService.login(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity, {
    description: 'Returns the currently authenticated user.'
  })
  async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
