import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AgencyService } from '../../services/agency/agency.service';
import { AgencyEntity } from '../../entities/agency.entity';
import { CreateAgencyInput } from '../../dto/create-agency.input';
import { UpdateAgencyInput } from '../../dto/update-agency.input';
import { GetAgenciesInput } from '../../dto/get-agencies.input';

@Resolver(() => AgencyEntity)
export class AgencyResolver {
  constructor(private readonly agencyService: AgencyService) {}

  @Query(() => AgencyEntity)
  async getAgency(@Args('id', { type: () => ID }) id: number) {
    return this.agencyService.getAgency(id);
  }

  @Query(() => [AgencyEntity])
  async getAgencies(
    @Args('usersInput')
    agenciesInput: GetAgenciesInput,
  ): Promise<AgencyEntity[]> {
    return this.agencyService.getAgencies(agenciesInput);
  }

  @Mutation(() => AgencyEntity)
  async createAgency(
    @Args('createAgency') createAgencyInput: CreateAgencyInput,
  ) {
    return this.agencyService.createAgency(createAgencyInput);
  }

  @Mutation(() => AgencyEntity)
  async updateAgency(
    @Args('updateAgency') updateAgencyInput: UpdateAgencyInput,
  ) {
    return this.agencyService.updateAgency(updateAgencyInput);
  }

  @Mutation(() => ID)
  async removeAgency(@Args('id', { type: () => ID }) id: number) {
    return this.agencyService.removeAgency(id);
  }
}
