import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EntService } from './ent.service';
import { EntEntity } from './entities/ent.entity';
import { CreateEntInput } from './dto/create-ent.input';
import { UpdateEntInput } from './dto/update-ent.input';
import { GetEntsOutput } from './dto/list-ent.output';
import { GetEntOutput } from './dto/details-ent.output';
import { FilterInput } from './dto/filter.input';
import { PaginationInput, SortInput } from '../commons/dto';

@Resolver(() => EntEntity)
export class EntResolver {
  constructor(private readonly entService: EntService) {}

  @Query(() => GetEntsOutput)
  async getEnts(
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
    @Args('filterInput', { nullable: true }) filterInput?: FilterInput,
    @Args('sortInput', { nullable: true }) sortInput?: SortInput,
  ): Promise<GetEntsOutput> {
    return await this.entService.getEnts(
      paginationInput,
      filterInput,
      sortInput,
    );
  }

  @Query(() => GetEntOutput)
  async getEnt(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GetEntOutput> {
    return await this.entService.getEnt(id);
  }

  @Mutation(() => GetEntOutput)
  async updateEnt(
    @Args('updateEntInput') updateEntInput: UpdateEntInput,
  ): Promise<GetEntOutput> {
    return await this.entService.updateEnt(updateEntInput);
  }

  @Mutation(() => Int)
  async deleteEnt(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<number> {
    return await this.entService.deleteEnt(id);
  }

  @Mutation(() => GetEntOutput)
  createEnt(
    @Args('createEntInput') createEntInput: CreateEntInput,
  ): Promise<GetEntOutput> {
    return this.entService.create(createEntInput);
  }
}
