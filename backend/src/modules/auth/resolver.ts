import { Args, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from './inputs';
import { LoginModel } from './models';
import { AuthService } from './service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginModel, {
    description: 'This graphql method for login user by email',
  })
  async loginUser(
    @Args('loginInput')
    loginInput: LoginInput,
  ) {
    return this.authService.login(loginInput);
  }
}
