import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntEntity } from './entities/ent.entity';
import { EntService } from './services/ent/ent.service';
import { EntResolver } from './resolvers/ent/ent.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EntEntity])],
  providers: [EntService, EntResolver],
})
export class EntsModule {}
