import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { MemeModule } from './meme/meme.module';
import { Meme } from './meme/entity/meme.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "postgres",
      "port": 5432,
      "username": "root",
      "password": "123456",
      "database": "backend",
      "entities": [User, Meme],
      "synchronize": true,
      "migrationsTableName": "migration_table",
      "migrations": ["dist/migration/*{.ts,.js}"],
      "cli": {
        "migrationsDir": "src/migration"
      },
      "autoLoadEntities": true
    }),
    AuthModule,
    MemeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
