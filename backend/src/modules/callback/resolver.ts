import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CallbackService } from './service';

@Resolver()
export class CallbackResolver {
  constructor(private readonly callBackService: CallbackService) {}

  @Mutation(() => Boolean, {
    description:
      'This graphql method of order callback by phone number and name',
  })
  async callback(
    @Args('phone', {
      type: () => String,
      description: 'User phone',
    })
    phone: string,
    @Args('name', {
      type: () => String,
      description: 'User name',
    })
    name: string,
    @Args('message', {
      type: () => String,
      description: 'User message',
    })
    message: string,
  ) {
    return this.callBackService.sendCallback(`${phone}`, name, message);
  }
}
