import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { BlogModule } from './blog/blog.module';
import { CustomConfigModule } from './modules/config/configs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: 'localhost',
  //     port: 5432,
  //     username: 'postgres',
  //     password: 'monfaredman',
  //     database: 'fastify',
  //     entities: ['dist/**/*.entity{.ts,.js}'],
  //     synchronize: true,
  //     // autoLoadEntities: true,
  //   }),
  //   UserModule,
  //   BlogModule,
  // ],
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [TypeOrmDbConfig],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmDbConfig],
})
export class AppModule {}
