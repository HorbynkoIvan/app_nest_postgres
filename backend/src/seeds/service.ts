import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntService } from '../modules/ents';
import { mockEnts } from '../mocks';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger();

  constructor(
    private configService: ConfigService,
    private readonly entService: EntService,
  ) {
    if (this.configService.get<boolean>('IS_USE_SEEDS')) {
      this.logger.verbose('RUN SEEDS');
      this.seedEnts();
    }
  }

  async seedEnts() {
    try {
      const entsCount = await this.entService.getEntsCount();

      // If there is already data in the table, the session will be terminated.
      if (entsCount > 0) {
        this.logger.verbose('Ents data already exists. Skipping seeds.');
        return;
      }

      const createdEnts = await Promise.all(
        mockEnts.map(async (entData) => {
          const createdEnt = await this.entService.createEnt(entData);
          this.logger.verbose(`Created ent with ID: ${createdEnt.id}`);
          return createdEnt;
        }),
      );

      this.logger.verbose('Ents seeding completed');
      return createdEnts;
    } catch (error) {
      this.logger.error('Failed to seed ents', error);
      throw error;
    }
  }
}
