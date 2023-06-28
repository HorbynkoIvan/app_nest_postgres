import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import {
  CreateOrganizationsInput,
  OrganizationsFilterInput,
  OrganizationOutput,
  UpdateOrganizationsInput,
} from './dto';
import { OrganizationsService } from './organizations.service';
import { OrganizationEntity } from './entities/organization.entity';
import { PaginationInput } from '../commons/dto';

@Resolver()
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query(() => OrganizationOutput, {
    description: 'This graphql method for getting organizations',
  })
  async getOrganizations(
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
    @Args('filterInput', { nullable: true })
    filterInput?: OrganizationsFilterInput,
  ): Promise<OrganizationOutput> {
    return this.organizationsService.getOrganizations(
      paginationInput,
      filterInput,
    );
  }

  @Query(() => OrganizationEntity, {
    nullable: true,
    description: 'This graphql method for getting one organization by id',
  })
  async getOrganization(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<OrganizationEntity | null> {
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
