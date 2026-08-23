import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  UsersModule,
  EntsModule,
  OrganizationsModule,
  CryptoModule,
  SeedsModule,
  // AuthModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.getOrThrow<string>('DB_HOST'),
        port: config.getOrThrow<number>('DB_PORT'),

        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),

        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    UsersModule,
    // AuthModule,
    EntsModule,
    OrganizationsModule,
    CryptoModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// TODO:
//   - Перевірити, чи @nestjs/apollo 13 можна використовувати без
// @apollo/server-plugin-landing-page-graphql-playground.
// - Видалити старий Playground plugin з dependency tree, якщо він більше не потрібен.