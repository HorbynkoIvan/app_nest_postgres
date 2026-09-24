import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import {
  CreateOrganizationInput,
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
    description: 'Returns organizations.',
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
    description: 'Returns organization by id',
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
    description: 'Create organization',
  })
  async createOrganization(
    @Args('organizationInput')
    organizationInput: CreateOrganizationInput,
  ) {
    return this.organizationsService.createOrganization(organizationInput);
  }

  @Mutation(() => OrganizationEntity, {
    description: 'Update organization',
  })
  async updateOrganization(
    @Args('organizationInput')
    organizationInput: UpdateOrganizationsInput,
  ) {
    return this.organizationsService.updateOrganization(organizationInput);
  }

  @Mutation(() => OrganizationEntity, {
    description: 'Deletes an organization by id.',
  })
  async deleteOrganization(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ) {
    return this.organizationsService.deleteOrganization(id);
  }
}
