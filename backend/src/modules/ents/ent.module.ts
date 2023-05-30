import { Module } from '@nestjs/common';
import { EntService } from './ent.service';
import { EntResolver } from './ent.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntEntity } from './entities/ent.entity';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([EntEntity]), UsersModule],
  providers: [EntResolver, EntService],
  exports: [EntService],
})
export class EntsModule {}
