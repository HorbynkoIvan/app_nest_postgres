import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AgencyService } from '../modules/agencies';
import { mockAgencies } from '../mocks';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger();

  constructor(
    private configService: ConfigService,
    private readonly agencyService: AgencyService,
  ) {
    if (this.configService.get<boolean>('IS_USE_SEEDS')) {
      this.logger.verbose('RUN SEEDS');
      this.seedAgencies();
    }
  }

  async seedAgencies() {
    try {
      const agenciesCount = await this.agencyService.getAgenciesCount();

      // If there is already data in the table, the session will be terminated.
      if (agenciesCount > 0) {
        this.logger.verbose('Agencies data already exists. Skipping seeds.');
        return;
      }

      const createdAgencies = await Promise.all(
        mockAgencies.map(async (agencyData) => {
          const createdAgency = await this.agencyService.createAgency(
            agencyData,
          );
          this.logger.verbose(`Created agency with ID: ${createdAgency.id}`);
          return createdAgency;
        }),
      );

      this.logger.verbose('Agencies seeding completed');
      return createdAgencies;
    } catch (error) {
      this.logger.error('Failed to seed agencies', error);
      throw error;
    }
  }
}
