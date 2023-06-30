import { Args, Query, Resolver, Context } from '@nestjs/graphql';
import { LoginInput } from './inputs';
import { LoginModel } from './models';
import { AuthService } from './service';
import { Public } from './decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginModel, {
    description: 'This graphql method for login user by email',
  })
  @Public()
  async loginUser(
    @Args('loginInput')
    loginInput: LoginInput,
  ) {
    return this.authService.login(loginInput);
  }

  @Query(() => Boolean)
  validateToken(@Context() ctx) {
    return true;
  }
}
