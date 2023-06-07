import { ConfigService } from '@nestjs/config';

export default async (configService: ConfigService) => {
  const user = configService.get<string>('MONGO_USER');
  const password = configService.get<string>('MONGO_PASSWORD');

  return {
    uri: `mongodb://${user}:${password}@learnup-mongo:27017/admin`,
  };
};
