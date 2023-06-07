import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../utils';

import { CallbackResolver } from './resolver';
import { CallbackService } from './service';

@Module({
  imports: [ConfigModule],
  providers: [CallbackResolver, CallbackService, HttpService],
})
export class CallbackModule {}
