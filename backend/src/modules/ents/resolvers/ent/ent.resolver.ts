import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EntService } from '../../services/ent/ent.service';
import { EntEntity } from '../../entities/ent.entity';
import { CreateEntInput } from '../../dto/create-ent.input';
import { UpdateEntInput } from '../../dto/update-ent.input';
import { GetEntInput } from '../../dto/get-ent.input';
import { PaginationInput } from '../../dto/pagination.input';
import { GetEntsOutput } from '../../dto/get-ents.output';

@Resolver(() => EntEntity)
export class EntResolver {
  constructor(private readonly entService: EntService) {}

  @Query(() => EntEntity)
  async getEnt(@Args('id', { type: () => ID }) id: number) {
    return this.entService.getEnt(id);
  }

  @Query(() => GetEntsOutput)
  async getEnts(
    @Args('filterInput') filterInput: GetEntInput,
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<{ ents: EntEntity[]; totalCount: number }> {
    return this.entService.getEnts(filterInput, paginationInput);
  }

  @Mutation(() => EntEntity)
  async createEnt(@Args('createEnt') createEntInput: CreateEntInput) {
    return this.entService.createEnt(createEntInput);
  }

  @Mutation(() => EntEntity)
  async updateEnt(@Args('updateEnt') updateEntInput: UpdateEntInput) {
    return this.entService.updateEnt(updateEntInput);
  }

  @Mutation(() => ID)
  async removeEnt(@Args('id', { type: () => ID }) id: number) {
    return this.entService.removeEnt(id);
  }
}
