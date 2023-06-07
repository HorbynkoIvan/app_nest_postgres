import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import {
  CreateOrganizationsInput,
  OrganizationsFilterInput,
  OrganizationOutput,
  OrganizationsPaginationInput,
  UpdateOrganizationsInput,
} from './dto';
import { OrganizationsService } from './organizations.service';
import { OrganizationEntity } from './entities/organization.entity';

@Resolver()
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query(() => OrganizationOutput, {
    description: 'This graphql method for getting organizations',
  })
  async getOrganizations(
    @Args('paginationInput') paginationInput: OrganizationsPaginationInput,
    @Args('filterInput', { nullable: true })
    filterInput?: OrganizationsFilterInput,
  ): Promise<OrganizationOutput> {
    return this.organizationsService.getOrganizations(
      paginationInput,
      filterInput,
    );
  }

  @Query(() => OrganizationEntity, {
    description: 'This graphql method for getting one organization by id',
  })
  async getOrganization(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<OrganizationEntity> {
    return this.organizationsService.getOrganization(id);
  }

  @Mutation(() => OrganizationEntity, {
    description: 'This graphql method for create organizations',
  })
  async createOrganization(
    @Args('organizationInput')
    organizationInput: CreateOrganizationsInput,
  ) {
    return this.organizationsService.createOrganization(organizationInput);
  }

  @Mutation(() => OrganizationEntity, {
    description: 'This graphql method for update organization data',
  })
  async updateOrganization(
    @Args('organizationInput')
    organizationInput: UpdateOrganizationsInput,
  ) {
    return this.organizationsService.updateOrganization(organizationInput);
  }

  @Mutation(() => OrganizationEntity, {
    description: 'This graphql method for deletting one organization by id',
  })
  async deleteOrganization(
    @Args('id', {
      type: () => Int,
      description: 'This graphql method for getting all organization by id ',
    })
    id: number,
  ) {
    return this.organizationsService.deleteOrganization(id);
  }
}
